# Tellor Giveaway
[Build A Project Using Tellor](https://gitcoin.co/issue/tellor-io/usingtellor/28/100024321)

[![hackathon](https://img.youtube.com/vi/LnQjB0qcfSg/0.jpg)](https://www.youtube.com/watch?v=LnQjB0qcfSg)

## Online Demo
Try it on your own! Works on Gorli using `Tellor Playground contract` deployed at [0x20374E579832859f180536A69093A126Db1c8aE9](https://goerli.etherscan.io/address/0x20374E579832859f180536A69093A126Db1c8aE9#code).

See https://docs.tellor.io/tellor/integration/reference-page for more information about integration.

[Online Demo](http://give.tellor.surge.sh/)

As part of the Gitcoin Hackathon we are building a Giveaway platform (similar to twitter giveaways).

This is a Proof Of Concept aiming to use `Tellor` technology to build innovative features on top of an Ethereum smart contract solution.

## Use case

An operator can create give away.

## Architecture

We have 2 main components:
- SmartGiveaway smart contract
- Front-End web application

### SmartGiveAway smart contract

Project is using [OpenZeppelin CLI](https://docs.openzeppelin.com/cli/2.7/) and is fully compatible with Truffle based projects.

#### Compile

```shell script
npx oz compile
```

### Front-End web application

#### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
# Static site is generate to: ./dist
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).