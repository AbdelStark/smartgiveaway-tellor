[![smartgiveaway Actions Status](https://github.com/abdelhamidbakhta/smartgiveaway/workflows/smartgiveaway-ci/badge.svg)](https://github.com/abdelhamidbakhta/smartgiveaway/actions)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/abdelhamidbakhta/smartgiveaway/blob/master/LICENSE)
[![sonar-quality-gate][sonar-quality-gate]][sonar-url]  [![sonar-bugs][sonar-bugs]][sonar-url] [![sonar-vulnerabilities][sonar-vulnerabilities]][sonar-url]

# Smart Giveaway
[Build A Project Using Tellor](https://gitcoin.co/issue/tellor-io/usingtellor/28/100024321)

## Online Demo
Try it on your own! Works on Gorli.

[Online Demo](http://smartgiveaway.surge.sh/)

As part of the Gitcoin Hackathon we are building a Giveaway platform (similar to twitter giveaways).

This is a Proof Of Concept aiming to use `Tello` technology to build innovative features on top of an Ethereum smart contract solution.

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

### Back-End service
[See instructions.](https://github.com/abdelhamidbakhta/smartgiveaway-backend)

[Online Open API specification](https://smartgiveaway.herokuapp.com/)

[sonar-url]: https://sonarcloud.io/dashboard?id=abdelhamidbakhta_smartgiveaway
[sonar-quality-gate]: https://sonarcloud.io/api/project_badges/measure?project=abdelhamidbakhta_smartgiveaway&metric=alert_status
[sonar-bugs]: https://sonarcloud.io/api/project_badges/measure?project=abdelhamidbakhta_smartgiveaway&metric=bugs
[sonar-vulnerabilities]: https://sonarcloud.io/api/project_badges/measure?project=abdelhamidbakhta_smartgiveaway&metric=vulnerabilities
