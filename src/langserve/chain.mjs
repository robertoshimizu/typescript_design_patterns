import { RemoteRunnable } from "langchain/runnables/remote";

const chain = new RemoteRunnable({
  url: `http://localhost:8001/chain/`,
});
const result = await chain.invoke({
  topic: "cats",
});

console.log(result)