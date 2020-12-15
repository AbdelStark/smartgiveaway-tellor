export class BackendClient {

    constructor(storage) {
        this.storage = storage;
        if(!storage.getItem('giveaways')) {
            this.storage.setItem('giveaways', JSON.stringify([]));
        }
    }

    createGiveAway(giveaway) {
        this.addItem(
            {
                "giveawayId": giveaway.contractAddress,
                "name": giveaway.name,
                "tweetLink": giveaway.tweetLink,
                "description": giveaway.description,
                "likeScore": giveaway.likeScore,
                "retweetScore": giveaway.retweetScore,
                "maxParticipants": giveaway.maxParticipants,
                "prize": giveaway.prize
            }
        );
    }

    findAllGiveAway() {
        return JSON.parse(this.storage.getItem('giveaways'));
    }


    removeGiveAway(id) {
        const data = JSON.parse(this.storage.getItem('giveaways'));
        const result = [];
        data.forEach(g => {
            if(g.giveawayId !== id){
                result.push(g);
            }
        });
        this.storage.setItem('giveaways', JSON.stringify(result));
    }

    addItem(item) {
        const data = JSON.parse(this.storage.getItem('giveaways'));
        data.push(item);
        this.storage.setItem('giveaways', JSON.stringify(data));
    }
}