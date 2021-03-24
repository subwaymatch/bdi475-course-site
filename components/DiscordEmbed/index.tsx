import WidgetBot from "@widgetbot/react-embed";

interface DiscordEmbedProps {
  width?: number;
  height?: number;
}

export default function DiscordEmbed({ width, height }: DiscordEmbedProps) {
  return (
    <WidgetBot
      server="802942331308212245"
      channel="803158486959390760"
      width={width ? width : ("100%" as any)}
      height={height ? height : 600}
    />
  );
}
