<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>

        <card>
          <h5 slot="header" class="title">Tellor</h5>
          <div class="row">
            <div class="col-md-4">
              <base-input label="Eth price" v-model="ethPrice"></base-input>
            </div>
            <div class="col-md-2">
              <base-button @click="updatePrice" class="mt-4">
                Update
              </base-button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2">
              <h3>Did get</h3>
            </div>
            <div class="col-md-2">
              <h3>{{ didGet }}</h3>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2">
              <h3>Timestamp</h3>
            </div>
            <div class="col-md-2">
              <h3>  {{ timestamp }}</h3>
            </div>
          </div>
        </card>

      </div>
      <router-view></router-view>
    </fade-transition>
  </div>
</template>
<script>
import {FadeTransition} from 'vue2-transitions';
import {mapState} from "vuex";
import {GiveAwayContractWrapper} from "@/services/GiveAwayContractWrapper";

require("@/widgets");

export default {
  components: {
    FadeTransition
  },
  data() {
    return {
      giveaway: null,
      ethPrice: 0,
      didGet: false,
      timestamp: 0,
    }
  },
  computed: {
    ...mapState([
      'services',
      'cache',
    ])
  },
  async mounted() {
    this.giveaway = this.getContractWrapper(this.cache.lastContractDeployed);
    await this.getInfo();
  },
  methods: {
    async updatePrice() {
      this.giveaway.submitValue(
          1,
          this.ethPrice,
          this.onTransactionHash,
          this.onReceipt,
          this.onError
      );
    },
    async getInfo() {
      const giveawayContract = this.giveaway;
      const oracleResponse = await giveawayContract.callOracle(1);
      console.log('callOracle: ', oracleResponse);
      this.didGet = oracleResponse[0];
      this.ethPrice = oracleResponse[1];
      this.timestamp = oracleResponse[2];
    },
    getContractWrapper(contractAddress) {
      return new GiveAwayContractWrapper(
          this.services.web3,
          this.services.ethereum.selectedAddress,
          contractAddress);
    },
    onTransactionHash(transactionHash) {
      console.log('transaction hash: ', transactionHash);
      this.$notifyMessage('success', 'Transaction submitted.');
    },
    async onReceipt(receipt) {
      console.log('receipt: ', receipt);
      this.$notifyMessage('success', 'Receipt received.');
      await this.getInfo();
    },
    onError(error) {
      console.error(error);
      this.$notifyMessage('dander', error.toString());
    },
  }
};
</script>
