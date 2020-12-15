import {GiveAwayArtifacts} from "@/assets/contracts/GiveAway";

export class GiveAwayContractWrapper{
    constructor(web3, senderAddress, contractAddress) {
        this.giveaway =  new web3.eth.Contract(GiveAwayArtifacts.abi, contractAddress);
        this.senderAddress = senderAddress;
    }

    async amIParticipating(){
        return await this.giveaway.methods.amIParticipating().call({
            from: this.senderAddress,
        });
    }

    async getWinnerId(){
        return await this.giveaway.methods.getWinnerId().call({
            from: this.senderAddress,
        });
    }

    async getWinnerAddress(){
        return await this.giveaway.methods.getWinnerAddress().call({
            from: this.senderAddress,
        });
    }

    async numberOfParticipants(){
        return await this.giveaway.methods.numberOfParticipants().call({
            from: this.senderAddress,
        });
    }

    async participantsScores(index){
        return await this.giveaway.methods.participantsScores(index).call({
            from: this.senderAddress,
        });
    }

    participate(participantId, onTransactionHash, onReceipt, onError){
        this.giveaway.methods.participate(participantId).send({
            from: this.senderAddress,
        })
            .on('transactionHash', onTransactionHash)
            .on('receipt', onReceipt)
            .on('error', onError);
    }

    like(onTransactionHash, onReceipt, onError){
        this.giveaway.methods.like().send({
            from: this.senderAddress,
        })
            .on('transactionHash', onTransactionHash)
            .on('receipt', onReceipt)
            .on('error', onError);
    }

    retweet(onTransactionHash, onReceipt, onError){
        this.giveaway.methods.retweet().send({
            from: this.senderAddress,
        })
            .on('transactionHash', onTransactionHash)
            .on('receipt', onReceipt)
            .on('error', onError);
    }

    close(onTransactionHash, onReceipt, onError){
        this.giveaway.methods.close().send({
            from: this.senderAddress,
        })
            .on('transactionHash', onTransactionHash)
            .on('receipt', onReceipt)
            .on('error', onError);
    }

    refreshUsingOracle(onTransactionHash, onReceipt, onError){
        this.giveaway.methods.refreshUsingOracle().send({
            from: this.senderAddress,
        })
            .on('transactionHash', onTransactionHash)
            .on('receipt', onReceipt)
            .on('error', onError);
    }

    async getTellorDidGet(){
        return await this.giveaway.methods.getTellorDidGet().call({
            from: this.senderAddress,
        });
    }

    async getTellorEthPrice(){
        return await this.giveaway.methods.getTellorEthPrice().call({
            from: this.senderAddress,
        });
    }

    async getTellorTimestamp(){
        return await this.giveaway.methods.getTellorTimestamp().call({
            from: this.senderAddress,
        });
    }

    async callOracle(id){
        return await this.giveaway.methods.callOracle(id).call({
            from: this.senderAddress,
        });
    }

    submitValue(id, value, onTransactionHash, onReceipt, onError){
        this.giveaway.methods.submitValue(id, value).send({
            from: this.senderAddress,
        })
            .on('transactionHash', onTransactionHash)
            .on('receipt', onReceipt)
            .on('error', onError);
    }
}