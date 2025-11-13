import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import mcpServer from "./mcp.js";

const mcpController = {
  createMcpServer: async (req, res) => {
    // const authToken = req.headers['authorization'];
    const server = mcpServer();
    console.log('Received MCP request', server);

    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true
    });

    res.on('close', () => {
      transport.close();
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  },
}
export default mcpController;
