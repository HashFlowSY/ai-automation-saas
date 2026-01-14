import type { NodeExecutor } from "../types";
import Handlebars from "handlebars";
import { decode } from "html-entities";
import { NonRetriableError } from "inngest";
import { discordChannel } from "@/inngest/channels/discord";
import ky from "ky";

Handlebars.registerHelper("json", (context) => {
  const stringified = JSON.stringify(context, null, 2);
  return new Handlebars.SafeString(stringified);
});

type DiscordData = {
  variableName?: string;
  webhookUrl?: string;
  username?: string;
  content?: string;
};

export const discordExecutor: NodeExecutor<DiscordData> = async ({
  data,
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(
    discordChannel().status({
      nodeId: nodeId,
      status: "loading",
    })
  );

  try {
    if (!data.webhookUrl) {
      await publish(
        discordChannel().status({
          nodeId: nodeId,
          status: "error",
        })
      );
      throw new NonRetriableError("Discord node: No webhook url configured");
    }
    if (!data.content) {
      await publish(
        discordChannel().status({
          nodeId: nodeId,
          status: "error",
        })
      );
      throw new NonRetriableError("Discord node: No content");
    }

    const rawContent = Handlebars.compile(data.content)(context);
    const content = decode(rawContent);
    const username = data.username
      ? decode(Handlebars.compile(data.username)(context))
      : undefined;

    const result = await step.run("discord-webhook", async () => {
      await ky.post(data.webhookUrl!, {
        json: {
          content: content.slice(1, 2000),
          username,
        },
      });

      if (!data.variableName) {
        await publish(
          discordChannel().status({
            nodeId: nodeId,
            status: "error",
          })
        );
        throw new NonRetriableError(
          "Discord node: No variable name configured"
        );
      }
      return {
        ...context,
        [data.variableName]: {
          messageContent: content.slice(0, 2000),
        },
      };
    });
    await publish(
      discordChannel().status({
        nodeId,
        status: "success",
      })
    );
    return result;
  } catch (error) {
    await publish(
      discordChannel().status({
        nodeId,
        status: "error",
      })
    );
    throw error;
  }
};
