import zhCN from "./zh-CN.ts";
import enUS from "./en-US.ts";
import { CalendarType } from "./interface";

const allLocales: Record<string, CalendarType> = {
  'zh-CN': zhCN,
  'en-US': enUS
}

export default allLocales;
