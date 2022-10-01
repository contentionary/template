import { CentreProps } from "@src/utils/interface";

export interface PluginProps {
  title: string;
  centre: CentreProps;
  numberOfPluginsToShow: number;
  setCentre: Function;
  pluginPage?: boolean;
}
export declare type PluginFunc = (props: PluginProps) => JSX.Element;
