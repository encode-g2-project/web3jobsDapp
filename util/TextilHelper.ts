
import { PrivateKey } from "@textile/hub";
import { Client, Identity, KeyInfo, ThreadID, Where } from "@textile/hub";
import { injectable } from "tsyringe";
import { isTypedArray } from "util/types";
import web3JobsthreadId from "../assets/web3jobsDatabaseThread.json";

@injectable()
export class TextilHelper {

  private key: KeyInfo = {
    key: "bzydtlz7debob74ohizoyxgh6dq",
  };

  private client: Client;

  //database identifier for web3jobsDatabase
  threadId: ThreadID = new ThreadID(new Uint8Array([1, 85, 206, 156, 111, 8, 96, 207, 127, 58, 131, 33, 169, 84, 159, 15, 4, 179, 151, 124, 151, 19, 168, 163, 157, 128, 52, 252, 192, 37, 123, 229, 218, 29, 53]));

  private async getIdentity(): Promise<PrivateKey> {
    /** Restore any cached user identity first */
    const cached = localStorage.getItem("user-private-identity");
    if (cached !== null) {
      /** Convert the cached identity string to a PrivateKey and return */
      return PrivateKey.fromString(cached);
    }
    /** No cached identity existed, so create a new one */
    const identity = await PrivateKey.fromRandom();
    /** Add the string copy to the cache */
    localStorage.setItem("user-private-identity", identity.toString());
    /** Return the random identity */
    return identity;
  }

  private async getClient() {

    if (this.client) return this.client;

    this.client = await Client.withKeyInfo(this.key);
    await this.client.getToken(await this.getIdentity());
    return this.client;
  }

  async newToken(client: Client, user: PrivateKey) {
    const token = await client.getToken(user);
    return token;
  }

  async createDB(client: Client) {
    const thread: ThreadID = await client.newDB(this.threadId, 'web3jobsData');
    return thread;
  }

  async createCollection(client: Client) {

    const jobPosting = {
      title: "JobPosting",
      type: "object",
      required: ["_id"],
      properties: {
        _id: {
          type: "string",
          description: "The instance's id.",
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        },
        company: {
          type: "string"
        },
        publishedId: {
          type: "string"
        },
        recruiterAddress: {
          type: "string"
        },
        location: {
          type: "string"
        },
        salaryRange: {
          type: "string"
        },
        positionsToFill: {
          type: "integer",
          minimum: 0,
        },
        bountyAmount: {
          type: "number",
          minimum: 0,
        },
        createdAt: {
          type: "string",
        },
        publishedAt: {
          type: "string",
          minimum: 0,
        },
      },
    }

    return await (client).newCollection(this.threadId, { name: 'jobPosting', schema: jobPosting })
  }

  async createJobPost(jobPosting: any) {
    const client = await this.getClient();
    return await client.create(this.threadId, 'jobPosting', [jobPosting]);
  }

  async queryJobPostsByRecruiter (recruiterAddress: string) {
    const query = new Where('recruiterAddress').eq(recruiterAddress);
    const client = await this.getClient();
    return await client.find<any>(this.threadId, 'jobPosting', query)
  }

}