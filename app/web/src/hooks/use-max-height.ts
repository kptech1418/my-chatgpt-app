/* 
  Source: https://github.com/openai/openai-apps-sdk-examples/tree/main/src 
*/

import { useOpenAiGlobal } from "./use-openai-global";

export const useMaxHeight = (): number | null => {
  return useOpenAiGlobal("maxHeight");
};
