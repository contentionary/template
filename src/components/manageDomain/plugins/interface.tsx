export interface PluginProps {
  title: string;
  numberOfPluginsToShow: number;
  pluginPage?: boolean;
}
export declare type PluginFunc = (props: PluginProps) => JSX.Element;
