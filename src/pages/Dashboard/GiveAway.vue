<template>
  <div class="content">
    <fade-transition :duration="100" mode="out-in">
      <!-- your content here -->
      <div>
        <!--div id="wrapper-tweet">
          <div id="tweet-container"></div>
        </div-->
        <card>
          <h5 slot="header" class="title">Give Away</h5>
          <div id="wrapper-tweet">
            <div v-for="giveaway in giveaways" :key="giveaway.giveawayId">
              <card type="user">
                <p class="card-text">
                </p>
                <div class="author">
                  <div class="block block-one"></div>
                  <div class="block block-two"></div>
                  <div class="block block-three"></div>
                  <div class="block block-four"></div>
                  <!--a :href="giveaway.tweetLink">
                    <h5 class="title">{{ giveaway.name }} - {{ giveaway.giveawayId }}</h5>
                    {{ giveaway.tweetLink }}
                  </a>
                  <pre class="description">{{ giveaway.description }} </pre-->
                </div>
                <p></p>
                <div class="row">
                  <div class="col-md-4 pr-md-1">
                    <div :id="tweetDivId(giveaway.giveawayId)"></div>
                  </div>
                  <div class="col-md-4 pr-md-1">
                    <div class="row">
                      <div class="col-md-6 pr-md-1 mt-4">
                        <h5 class="card-category">Prize</h5>
                        <h2 class="card-title">
                          {{ giveaway.prize }}
                        </h2>
                        <base-button @click="refreshUsingOracle(giveaway)">Refresh</base-button>
                        <base-button @click="getInfo(giveaway)">Info</base-button>
                      </div>
                      <div class="col-md-6 pr-md-1 mt-4">
                        <h5 class="card-category">Max Participants</h5>
                        <h2 class="card-title">
                          {{ giveaway.maxParticipants }}
                        </h2>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 pr-md-1 mt-4">
                        <h5 class="card-category">Like bonus</h5>
                        <h2 class="card-title">
                          {{ giveaway.likeScore }}
                        </h2>
                      </div>
                      <div class="col-md-6 pr-md-1 mt-4">
                        <h5 class="card-category">Retweet bonus</h5>
                        <h2 class="card-title">
                          {{ giveaway.retweetScore }}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2 pr-md-1">
                    <VueSvgGauge
                        :start-angle="-110"
                        :end-angle="110"
                        :value="giveaway.numberOfParticipants"
                        :separator-step="1"
                        :min="0"
                        :max="giveaway.maxParticipants"
                        :gauge-color="[{ offset: 0, color: '#347AB0'}, { offset: 100, color: '#8CDFAD'}]"
                        :scale-interval="0.1"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-2 pr-md-1 mt-4 ml-2">
                    <base-button @click="participateGiveAway(giveaway)">
                      Participate
                      <font-awesome-icon icon="plus"/>
                    </base-button>
                  </div>
                  <div class="col-md-1 pr-md-1 mt-4">
                    <base-button @click="likeGiveaway(giveaway)">
                      <font-awesome-icon icon="heart"/>
                    </base-button>
                  </div>
                  <div class="col-md-1 pr-md-1 mt-4">
                    <base-button @click="retweetGiveaway(giveaway)">
                      <i class="fab fa-twitter"></i>
                    </base-button>
                  </div>
                  <div class="col-md-2 pr-md-1 mt-4">
                    <base-button @click="winner(giveaway)">
                      Winner
                      <font-awesome-icon icon="trophy"/>
                    </base-button>
                  </div>
                  <div class="col-md-2 pr-md-1 mt-4">
                    <base-button @click="closeGiveAway(giveaway)">
                      Close
                      <font-awesome-icon icon="clock"/>
                    </base-button>
                  </div>
                  <div class="col-md-1 pr-md-1 mt-4">
                    <base-button class="btn-danger" @click="removeGiveAway(giveaway)">
                      <font-awesome-icon icon="trash"/>
                    </base-button>
                  </div>
                </div>
              </card>
            </div>
          </div>
        </card>
        <b-modal
            id="modal-confirm-participation"
            title="GiveAway Participation"
            hide-footer
        >
          <div class="row">
            <div class="col-md-4 mt-2">
              <label>
                <i class="fab fa-twitter mr-2"></i>
                <input v-model="twitterHandle">
              </label>
            </div>
          </div>
          <div class="row ml-2">
            Do you want to participate to this Give Away ?
          </div>

          <div class="row">
            <div class="col-md-2 mr-2">
              <base-button class="btn-primary" :loading="loading" @click="confirmParticipation">
                Yes
              </base-button>
            </div>
            <div class="col-md-2 mr-2">
              <base-button class="btn-danger">
                No
              </base-button>
            </div>
          </div>
        </b-modal>
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
      currentFindAllResponse: '',
      giveaways: [],
      polling: null,
      selectedGiveAway: null,
      twitterHandle: '',
      currentModalId: null,
      loading: false,
      gaugeLoaded: false,
      x: 0,
      index: 0,
    }
  },
  computed: {
    ...mapState([
      'services',
      'cache',
    ])
  },
  async mounted() {
    await this.findAllGiveAway();
    setInterval(this.loadGauge, 1500);
    this.$nextTick(() => {
      this.test();
      this.loadGauge();
    });
  },
  async created() {
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
  methods: {
    refreshUsingOracle(giveaway) {
      const giveawayContract = this.getContractWrapper(giveaway.giveawayId);
      giveawayContract.refreshUsingOracle(
          this.onTransactionHash,
          this.onReceipt,
          this.onError
      );
    },
    async getInfo(giveaway) {
      const giveawayContract = this.getContractWrapper(giveaway.giveawayId);
      const didGet = await giveawayContract.getTellorDidGet();
      console.log('getTellorDidGet: ', didGet);
      const ethPrice = await giveawayContract.getTellorEthPrice();
      console.log('getTellorEthPrice: ', ethPrice);
      const timestamp = await giveawayContract.getTellorTimestamp();
      console.log('getTellorTimestamp: ', timestamp);
      const oracleResponse = await giveawayContract.callOracle(1);
      console.log('callOracle: ', oracleResponse);
    },
    pollData() {
      this.polling = setInterval(this.findAllGiveAway, 2000);
    },
    tweetDivId(giveawayId) {
      return `tweet-${giveawayId}`;
    },
    findAllGiveAway() {
      const response = this.services.backend.findAllGiveAway();
      console.log('findAllGiveAway: ', response);
      if (Array.isArray(response) && response.length > 0) {
        this.giveaways = response;
      }
    },
    removeGiveAway(giveaway) {
      this.services.backend.removeGiveAway(giveaway.giveawayId);
      this.findAllGiveAway();
    },
    async loadGauge() {
      if (!this.gaugeLoaded) {
        console.log('loading gauge');
        console.log(this.giveaways);
        for (const giveaway of this.giveaways) {
          const giveawayContract = this.getContractWrapper(giveaway.giveawayId);
          const n = await giveawayContract.numberOfParticipants();
          console.log('number of participants: ', n);
          console.log('max participants: ', giveaway.maxParticipants);
          giveaway.numberOfParticipants = parseInt(n);
        }
        this.$forceUpdate();
        this.gaugeLoaded = true;
      }
    },
    async closeGiveAway(giveaway) {
      const giveawayContract = this.getContractWrapper(giveaway.giveawayId);
      giveawayContract.close(
          this.onTransactionHash,
          this.onGiveAwayClosed,
          this.onError
      );
    },
    async winner(giveaway) {
      const giveawayContract = this.getContractWrapper(giveaway.giveawayId);
      const winner = await giveawayContract.getWinnerId();
      console.log('the winner is: ', winner);
      this.$notifyMessage('success', 'Winner: ' + winner);
    },
    async onGiveAwayClosed(receipt) {
      this.$notifyMessage('success', 'Give Away is now closed.');
    },
    async participateGiveAway(giveaway) {
      console.log('checking if user is already participating.');
      this.selectedGiveAway = giveaway;
      const giveawayContract = this.getContractWrapper(giveaway.giveawayId);
      const isUserParticipating = await giveawayContract.amIParticipating();
      console.log('user is participating: ', isUserParticipating);
      if (!isUserParticipating) {
        this.showModal('modal-confirm-participation');
      }
    },
    async likeGiveaway(giveaway) {
      const giveawayContract = this.getContractWrapper(giveaway.giveawayId);
      giveawayContract.like(
          this.onTransactionHash,
          this.onReceipt,
          this.onError
      );
    },
    async retweetGiveaway(giveaway) {
      const giveawayContract = this.getContractWrapper(giveaway.giveawayId);
      giveawayContract.retweet(
          this.onTransactionHash,
          this.onReceipt,
          this.onError
      );
    },
    async getSeed(giveaway) {
      const giveawayContract = this.getContractWrapper(giveaway.giveawayId);
      const seed = await giveawayContract.getSeedForCurrentPhase();
      console.log('the seed is: ', seed);
    },
    async getSeedModuloX(giveaway) {
      const giveawayContract = this.getContractWrapper(giveaway.giveawayId);
      const seed = await giveawayContract.getSeedModuloX(this.x);
      console.log('the seed is: ', seed);
    },
    async participantsScores(giveaway) {
      const giveawayContract = this.getContractWrapper(giveaway.giveawayId);
      const scores = await giveawayContract.participantsScores(this.index);
      console.log(scores);
    },
    async getNextCommitPhaseStartBlock(giveaway) {
      const giveawayContract = this.getContractWrapper(giveaway.giveawayId);
      const startBlock = await giveawayContract.getNextCommitPhaseStartBlock();
      console.log('getNextCommitPhaseStartBlock: ', startBlock);
    },
    async getNextRevealPhaseStartBlock(giveaway) {
      const giveawayContract = this.getContractWrapper(giveaway.giveawayId);
      const startBlock = await giveawayContract.getNextRevealPhaseStartBlock();
      console.log('getNextRevealPhaseStartBlock: ', startBlock);
    },
    getContractWrapper(contractAddress) {
      return new GiveAwayContractWrapper(
          this.services.web3,
          this.services.ethereum.selectedAddress,
          contractAddress);
    },
    confirmParticipation() {
      this.loading = true;
      const giveawayContract = this.getContractWrapper(this.selectedGiveAway.giveawayId);
      giveawayContract.participate(
          this.twitterHandle,
          this.onTransactionHash,
          this.onReceipt,
          this.onError
      );
    },
    onTransactionHash(transactionHash) {
      console.log('transaction hash: ', transactionHash);
      this.$notifyMessage('success', 'Transaction submitted.');
    },
    onReceipt(receipt) {
      console.log('receipt: ', receipt);
      this.$notifyMessage('success', 'Receipt received.');
      this.loading = false;
      this.hideModal();
      this.gaugeLoaded = false;
    },
    onError(error) {
      console.error(error);
      this.$notifyMessage('dander', error.toString());
      this.hideModal();
      this.loading = false;
    },
    showModal(id) {
      this.currentModalId = id;
      this.$bvModal.show(this.currentModalId);
    },
    hideModal() {
      if (this.currentModalId !== null) {
        this.$bvModal.hide(this.currentModalId);
      }
    },
    async test() {
      for (const giveaway of this.giveaways) {
        this.displayTweet(giveaway.giveawayId, this.tweetIdFromUrl(giveaway.tweetLink));
      }
    },
    displayTweet(giveawayId, id) {
      const twContainer = document.getElementById(this.tweetDivId(giveawayId));
      twttr.widgets.createTweet(
          id,
          twContainer,
          {
            theme: "white",
            conversation: 'none',
            cards: 'hidden',
            align: 'left'
          }
      );
    },
    tweetIdFromUrl(tweetUrl) {
      const res = tweetUrl.split('/');
      return res[res.length - 1];
    }
  }
  ,
}
;
</script>
