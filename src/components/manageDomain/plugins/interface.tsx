import { CentreProps } from "@src/components/cards/centre";

export interface PluginProps {
  title: string;
  centre: CentreProps;
  numberOfPluginsToShow: number;
  setCentre: Function;
  pluginPage?: boolean;
}
export declare type PluginFunc = (props: PluginProps) => JSX.Element;
