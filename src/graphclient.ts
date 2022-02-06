import { GraphQLClient } from "graphql-request";

export class GraphClient {
    private client: GraphQLClient;

    public constructor(endpoint: string) {
        this.client = new GraphQLClient(endpoint, { headers: {} });
    }

    public async getStatus() {
        const query = `
        {
            status {
                version
                node {
                    id
                    network
                    moniker
                }
                sync {
                    latest_block_hash
                    latest_block_height
                    latest_block_time
                    catching_up
                }
                validator {
                    address
                    voting_power
                }
                validators {
                    address
                    voting_power
                }
                num_peers
                peers {
                    node {
                        id
                        network
                        moniker
                    }

                }
                disk_usage
            }
        }
        `
        const data = await this.client.request(query);
        return JSON.stringify(data, undefined, 2);
    }

    public async getAccounts(addresses: string[]) {
        const query = `
        query getAccounts($addresses: [String]!) {
            getAccounts(addresses: $addresses) {
                address
                number
                sequence
                balance {
                    type
                    quantity
                }
            }
        }`

        const variables = {
            addresses: addresses,
        }

        const data = await this.client.request(query, variables);
        return JSON.stringify(data, undefined, 2);
    }

    public async getBondsByIds(ids: string[]) {
        const query = `
        query getBondsByIds($ids: [String]!) {
            getBondsByIds(ids: $ids) {
                id
                owner
                balance {
                    type
                    quantity
                }
            }
        }`

        const variables = {
            ids: ids,
        }

        const data = await this.client.request(query, variables);
        return JSON.stringify(data, undefined, 2);
    }

    // public async queryBonds() {
    // }

    public async queryBondsByOwner(ownerAddresses: string[]) {
        const query = `
        query bondsByOwner($ownerAddresses: [String]!) {
            queryBondsByOwner(ownerAddresses: $ownerAddresses) {
                owner
                bonds {
                    id
                    balance {
                        type
                        quantity
                    }
                }
            }
        }`

        const variables = {
            ownerAddresses: ownerAddresses,
        }

        const data = await this.client.request(query, variables);
        return JSON.stringify(data, undefined, 2);
    }

    public async getRecordsByIds(ids: string[]) {
        const query = `
        query getRecordsByIDs($ids: [String]!) {
            getRecordsByIds(ids: $ids) {
                id
                names
                bondId
                createTime
                expiryTime
                owners
            }
        }`

        const variables = {
            ids: ids,
        }

        const data = await this.client.request(query, variables);
        return JSON.stringify(data, undefined, 2);
    }

    public async queryRecords(all: boolean) {
        const query = `
        query records($all: Boolean) {
            queryRecords(all: $all) {
                id
                names
                bondId
                createTime
                expiryTime
                owners
            }
        }`

        const variables = {
            all: all,
        }

        const data = await this.client.request(query, variables);
        return JSON.stringify(data, undefined, 2);
    }

    public async lookupAuthorities(names: string[]) {
        const query = `
        query lookupAuthorities($names: [String!]) {
            lookupAuthorities(names: $names) {
                ownerAddress
                ownerPublicKey
                height
                status
                bondId
                expiryTime
                auction {
                    id
                    status
                    createTime
                    commitsEndTime
                    revealsEndTime
                    commitFee {
                        type
                        quantity
                    }
                    revealFee {
                        type
                        quantity
                    }
                    minimumBid {
                        type
                        quantity
                    }
                    winnerAddress
                    winnerBid
                    winnerPrice
                }
            }
        }`

        const variables = {
            names: names,
        }

        const data = await this.client.request(query, variables);
        return JSON.stringify(data, undefined, 2);
    }

    public async lookupNames(names: string[]) {
        const query = `
        query lookupNames($names: [String!]) {
            lookupNames(names: $names) {
                latest {
                    id
                    height
                }
                history {
                    id
                    height
                }
            }
        }`
        
        const variables = {
            names: names,
        }

        const data = await this.client.request(query, variables);
        return JSON.stringify(data, undefined, 2);
    }

    public async resolveNames(names: string[]) {
        const query = `
        query resolveNames($names: [String!]) {
            resolveNames(names: $names) {
                id
                names
                bondId
                createTime
                expiryTime
                owners
            }
        }`

        const variables = {
            names: names,
        }

        const data = await this.client.request(query, variables);
        return JSON.stringify(data, undefined, 2);
    }

    public async getAuctionsByIds(ids: string[]) {
        const query = `
        query auctionsByIds($ids: [String!]) {
            getAuctionsByIds(ids: $ids) {
                id
                status
                createTime
                commitsEndTime
                revealsEndTime
                commitFee {
                    type
                    quantity
                }
                revealFee {
                    type
                    quantity
                }
                minimumBid {
                    type
                    quantity
                }
                winnerAddress
                winnerBid
                winnerPrice
            }
        }`

        const variables = {
            ids: ids,
        }

        const data = await this.client.request(query, variables);
        return JSON.stringify(data, undefined, 2);
    }
}