import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import widgets from './widgets.js';

const getToolMeta = (tool) => {
  const meta = {};
  if (tool?.outputTemplateUri) {
    meta['openai/outputTemplate'] = tool.outputTemplateUri;
    meta['openai/widgetAccessible'] = true;
    meta['openai/resultCanProduceWidget'] = true;
  }
  if (tool?.invoking) {
    meta["openai/toolInvocation/invoking"] = tool.invoking;
  }
  if (tool?.invoked) {
    meta["openai/toolInvocation/invoked"] = tool.invoked;
  }
 
  return meta;
};

const createMcpServer = () => {
  const server = new McpServer({
    name: 'my-mcp',
    version: '1.0.0',
  });

  Object.values(widgets).forEach((widget) => {
    if (widget?.resources?.length) {
      widget.resources.forEach((resource) => {
        server.registerResource(
          resource.name,
          resource.outputTemplateUri,
          {},
          () => ({
            contents: [{
              uri: resource.outputTemplateUri,
              mimeType: "text/html+skybridge",
              text: resource.html
            }]
          })
        );
      });
    }

    if (widget?.tools?.length) {
      widget.tools.forEach((tool) => {
        server.registerTool(
          tool.name, {
            title: tool.title,
            description: tool.description,
            inputSchema: tool.inputSchema,
            outputSchema: tool.outputSchema,
            _meta: getToolMeta(tool),
          },
          tool.implementation
        );
      });
    }
  });

  return server;
};

export default createMcpServer;
