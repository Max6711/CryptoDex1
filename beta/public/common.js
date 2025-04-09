'use strict'

const COLOR_THEMES = {
	LIGHT_BLUE: {
		background_html: '#FFF',
		background_top: '#0002',
		background_color: '#FFFE',
		background_hover: '#0002', // li
		color: '#000D',
		chart_line: '#00F8', // blue
		links: '#00F8'
	},
	DARK_ORANGE: {
		background_html: '#000D',
		background_top: '#444C',
		background_hover: '#DDD4', // li
		background_inverted: '#BBB2', // img buttons
		background_color: '#333D',
		color: '#FFFB',
		chart_line: '#F90D', // orange
		links: '#F90D'
	}
}

/* Backend API url */
/* https://api.dexpairs.xyz or empty for localhost */
const DOMAIN_NAME = 'DexPairs.xyz'
const SERVER_URL = window.location.href.includes(DOMAIN_NAME.toLowerCase()) ? 'https://api.dexpairs.xyz' : ''
const PAGES = {
	CHARTS: 'charts',
	WALLET: 'wallet'
}
const CURRENT_PAGE =
	window.location.href.toLowerCase().includes(PAGES.CHARTS)
		? PAGES.CHARTS
		: window.location.href.toLowerCase().includes(PAGES.WALLET)
			? PAGES.WALLET
			: null

const ALPHA_NUM = 'abcdefghijklmnopqrstuvwxyz0123456789-'
const TIME_24H = 1000*60*60*24
const TIME_1W = 1000*60*60*24*7
const TIME_1M = 1000*60*60*24*30
const TIME_1Y = 1000*60*60*24*365

const INTERVAL_15M = '15m'
const INTERVAL_4H = '4h'
const INTERVAL_1D = '1d'
const INTERVAL_1W = '1w'

const OFTEN = 900000 // 15 minutes
const HOURS = 14400000 // 4 hours
const DAY = 86400000 // 1 day
const WEEK = 604800000 // 1 week


const NETWORK = {
	ETHEREUM: {
		chainId: 1,
		enum: 'ETHEREUM',
		name: 'Ethereum',
		shortName: 'eth',
		img: '/img/ethereum-icon.svg',
		color: '#3a3a39',
		rpc: 'https://cloudflare-eth.com', // 'https://cloudflare-eth.com', 'https://api.mycryptoapi.com/eth'
		explorer: 'https://etherscan.io/token/',
		normaltx: 'https://api.etherscan.io/api?module=account&action=txlist&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		tokentx: 'https://api.etherscan.io/api?module=account&action=tokentx&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		erc721tx: 'https://api.etherscan.io/api?module=account&action=tokennfttx&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		tokenbalance: 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=CONTRACT_ADDRESS&address=WALLET_ADDRESS&tag=latest',
		url_data: SERVER_URL + '/eth',
		tokenContract: '0x0',
		tokenSymbol: 'ETH',
		tokenName: 'Ethereum',
		tokenDecimal: 18,
		tokenPriceContract: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
		subgraph_url: 'https://thegraph.com/hosted-service/subgraph/uniswap/uniswap-v3',
		coingecko_name: 'ethereum',
		tokens: {
			token: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
			base: '0xdac17f958d2ee523a2206206994597c13d831ec7'
		},
		url: 'https://uniswap.org/',
		url_swap: 'https://app.uniswap.org/#/swap'
	},
	OPTIMISM: {
		chainId: 10,
		enum: 'OPTIMISM',
		name: 'Optimistic Ethereum',
		shortName: 'oeth',
		img: '/img/optimism-icon.svg',
		color: '#e84142',
		rpc: 'https://mainnet.optimism.io',
		explorer: 'https://optimistic.etherscan.io',
		normaltx: 'https://api-optimistic.etherscan.io/api?module=account&action=txlist&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		tokentx: 'https://api-optimistic.etherscan.io/api?module=account&action=tokentx&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		erc721tx: 'https://api-optimistic.etherscan.io/api?module=account&action=tokennfttx&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		tokenbalance: 'https://api-optimistic.etherscan.io/api?module=account&action=tokenbalance&contractaddress=CONTRACT_ADDRESS&address=WALLET_ADDRESS&tag=latest',
		// url_data: '',
		tokenContract: '0x0',
		tokenSymbol: 'OETH',
		tokenName: 'Ether',
		tokenDecimal: 18,
		tokenPriceContract: '0x4200000000000000000000000000000000000006',
		subgraph_url: '',
		coingecko_name: 'optimistic-ethereum',
	},
	CRONOS: {
		chainId: 25,
		enum: 'CRONOS',
		name: 'Cronos',
		shortName: 'cro',
		img: '/img/cronos-icon.svg',
		color: '#00296c',
		rpc: 'https://evm-cronos.crypto.org',
		explorer: 'https://cronos.crypto.org/explorer/token/',
		normaltx: 'https://cronos.crypto.org/explorer/api?module=account&action=txlist&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		tokentx: 'https://cronos.crypto.org/explorer/api?module=account&action=tokentx&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		erc721tx: null,
		tokenbalance: 'https://cronos.crypto.org/explorer/api?module=account&action=tokenbalance&contractaddress=CONTRACT_ADDRESS&address=WALLET_ADDRESS&tag=latest',
		// url_data: '',
		tokenContract: '0x0',
		tokenSymbol: 'CRO',
		tokenName: 'Crypto.org Coin',
		tokenDecimal: 18,
		tokenPriceContract: '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
		subgraph_url: '',
		coingecko_name: 'cronos'
	},
	BSC : {
		chainId: 56,
		enum: 'BSC',
		name: 'BNB Chain',
		shortName: 'bnb',
		img: '/img/bsc-icon.svg',
		color: '#f0b931',
		rpc: 'https://bsc.meowrpc.com', // https://1rpc.io/bnb
		explorer: 'https://bscscan.com/token/',
		normaltx: 'https://api.bscscan.com/api?module=account&action=txlist&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		tokentx: 'https://api.bscscan.com/api?module=account&action=tokentx&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		erc721tx: 'https://api.bscscan.com/api?module=account&action=tokennfttx&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		tokenbalance: 'https://api.bscscan.com/api?module=account&action=tokenbalance&contractaddress=CONTRACT_ADDRESS&address=WALLET_ADDRESS&tag=latest',
		url_data: SERVER_URL + '/bnb',
		tokenContract: '0x0',
		tokenSymbol: 'BNB',
		tokenName: 'BNB',
		tokenDecimal: 18,
		tokenPriceContract: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
		subgraph_url: 'https://thegraph.com/hosted-service/subgraph/sushiswap/bsc-exchange',
		coingecko_name: 'binance-smart-chain',
		tokens: {
			token: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
			base: '0xe9e7cea3dedca5984780bafc599bd69add087d56'
		},
		url: 'https://www.sushi.com/',
		url_swap: 'https://app.sushi.com/swap?&chainId=56'
	},
	XDAI: {
		chainId: 100,
		enum: 'XDAI',
		name: 'Gnosis (xDai)',
		shortName: 'gno',
		img: '/img/xdai-icon.svg',
		color: '#4ea8a6',
		rpc: 'https://rpc.gnosischain.com',
		explorer: 'https://gnosisscan.io/token/',
		normaltx: 'https://api.gnosisscan.io/api?module=account&action=txlist&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		tokentx: 'https://api.gnosisscan.io/api?module=account&action=tokentx&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		erc721tx: null,
		tokenbalance: 'https://api.gnosisscan.io/api?module=account&action=tokenbalance&contractaddress=CONTRACT_ADDRESS&address=WALLET_ADDRESS&tag=latest',
		url_data: SERVER_URL + '/gno',
		tokenContract: '0x0',
		tokenSymbol: 'XDAI',
		tokenName: 'xDai',
		tokenDecimal: 18,
		tokenPriceContract: '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d',
		subgraph_url: 'https://thegraph.com/hosted-service/subgraph/kirkins/honeyswap',
		coingecko_name: 'xdai',
		tokens: {
			token: '0x9c58bacc331c9aa871afd802db6379a98e80cedb',
			base: '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d'
		},
		url: 'https://honeyswap.org/',
		url_swap: 'https://app.honeyswap.org/#/swap'
	},
	POLYGON: {
		chainId: 137,
		enum: 'POLYGON',
		name: 'Polygon',
		shortName: 'matic',
		img: '/img/polygon-icon.svg',
		color: '#8249e5',
		rpc: 'https://polygon-rpc.com',
		explorer: 'https://polygonscan.com/token/',
		normaltx: 'https://api.polygonscan.com/api?module=account&action=txlist&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		tokentx: 'https://api.polygonscan.com/api?module=account&action=tokentx&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		erc721tx: 'https://api.polygonscan.com/api?module=account&action=tokennfttx&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		tokenbalance: 'https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=CONTRACT_ADDRESS&address=WALLET_ADDRESS&tag=latest',
		url_data: SERVER_URL + '/matic',
		tokenContract: '0x0',
		tokenSymbol: 'MATIC',
		tokenName: 'Matic',
		tokenDecimal: 18,
		tokenPriceContract: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
		subgraph_url: 'https://thegraph.com/hosted-service/subgraph/henrydapp/quickswap',
		coingecko_name: 'polygon-pos',
		tokens: {
			token: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
			base: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
		},
		url: 'https://quickswap.exchange/',
		url_swap: 'https://quickswap.exchange/#/swap'
	},
	FANTOM: {
		chainId: 250,
		enum: 'FANTOM',
		name: 'Fantom',
		shortName: 'ftm',
		img: '/img/fantom-icon.svg',
		color: '#1c68fb',
		rpc: 'https://rpcapi.fantom.network',
		explorer: 'https://ftmscan.com/token/',
		normaltx: 'https://api.ftmscan.com/api?module=account&action=txlist&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		tokentx: 'https://api.ftmscan.com/api?module=account&action=tokentx&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		erc721tx: 'https://api.ftmscan.com/api?module=account&action=tokennfttx&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		tokenbalance: 'https://api.ftmscan.com/api?module=account&action=tokenbalance&contractaddress=CONTRACT_ADDRESS&address=WALLET_ADDRESS&tag=latest',
		url_data: SERVER_URL + '/ftm',
		tokenContract: '0x0',
		tokenSymbol: 'FTM',
		tokenName: 'Fantom',
		tokenDecimal: 18,
		tokenPriceContract: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
		subgraph_url: 'https://thegraph.com/hosted-service/subgraph/layer3org/spiritswap-analytics',
		coingecko_name: 'fantom',
		// tokens: {
		// 	token: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
		// 	base: '0x04068da6c83afcfa0e13ba15a6696662335d5b75'
		// },
		url: 'https://www.spiritswap.finance/',
		url_swap: 'https://swap.spiritswap.finance/#/swap'
	},
	ZKSYNC_ERA: {
		chainId: 324,
		enum: 'ZKSYNC_ERA',
		name: 'zkSync Era∎',
		shortName: 'zksync',
		img: '/img/zksync-icon.svg',
		color: '#8c8dfc',
		rpc: 'https://mainnet.era.zksync.io',
		explorer: 'https://explorer.zksync.io/address/',
		tokenInfo: 'https://explorer.zksync.io/address/CONTRACT_ADDRESS',
		normaltx: 'https://block-explorer-api.mainnet.zksync.io/api?module=account&action=txlist&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		tokentx: 'https://block-explorer-api.mainnet.zksync.io/api?module=account&action=tokentx&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		erc721tx: 'https://block-explorer-api.mainnet.zksync.io/api?module=account&action=tokennfttx&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		tokenbalance: 'https://block-explorer-api.mainnet.zksync.io/api?module=account&action=tokenbalance&contractaddress=CONTRACT_ADDRESS&address=WALLET_ADDRESS&tag=latest',
		url_data: '',
		tokenContract: '0x000000000000000000000000000000000000800a',
		tokenSymbol: 'ETH',
		tokenName: 'Ethereum',
		tokenDecimal: 18,
		tokenPriceContract: '0x0000000000000000000000000000000000000000',
		subgraph_url: '',
		coingecko_name: 'zksync'
	},
	ARBITRUM_ONE: {
		chainId: 42161,
		enum: 'ARBITRUM_ONE',
		name: 'Arbitrum One',
		shortName: 'arb1',
		img: '/img/arbitrum-icon.svg',
		color: '#3aa0f0',
		rpc: 'https://arb1.arbitrum.io/rpc',
		explorer: 'https://arbiscan.io/token/',
		normaltx: 'https://api.arbiscan.io/api?module=account&action=txlist&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		tokentx: 'https://api.arbiscan.io/api?module=account&action=tokentx&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		erc721tx: 'https://api.arbiscan.io/api?module=account&action=tokennfttx&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		tokenbalance: 'https://api.arbiscan.io/api?module=account&action=tokenbalance&contractaddress=CONTRACT_ADDRESS&address=WALLET_ADDRESS&tag=latest',
		url_data: SERVER_URL + '/arb1',
		tokenContract: '0x0',
		tokenSymbol: 'AETH',
		tokenName: 'Ether',
		tokenDecimal: 18,
		tokenPriceContract: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1', // WETH
		subgraph_url: 'https://thegraph.com/hosted-service/subgraph/ianlapham/arbitrum-minimal',
		coingecko_name: 'arbitrum-one',
		tokens: {
			token: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
			base: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'
		},
		url: 'https://arbitrum.io/',
		url_swap: 'https://app.uniswap.org/#/swap'
	},
	CELO: {
		chainId: 42220,
		enum: 'CELO',
		name: 'Celo',
		shortName: 'celo',
		img: '/img/celo-icon.svg',
		color: '#6ad181',
		rpc: 'https://forno.celo.org',
		explorer: 'https://explorer.celo.org/token/',
		normaltx: 'https://explorer.celo.org/api?module=account&action=txlist&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		tokentx: 'https://explorer.celo.org/api?module=account&action=tokentx&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		erc721tx: null,
		tokenbalance: 'https://explorer.celo.org/api?module=account&action=tokenbalance&contractaddress=CONTRACT_ADDRESS&address=WALLET_ADDRESS&tag=latest',
		url_data: '', // SERVER_URL + '/ubeswap',
		tokenContract: '0x0',
		tokenSymbol: 'CELO',
		tokenName: 'CELO',
		tokenDecimal: 18,
		tokenPriceContract: '0x471ece3750da237f93b8e339c536989b8978a438',
		subgraph_url: 'https://thegraph.com/hosted-service/subgraph/ubeswap/ubeswap',
		coingecko_name: 'celo'
	},
	AVALANCHE: {
		chainId: 43114,
		enum: 'AVALANCHE',
		name: 'Avalanche',
		shortName: 'avalanche',
		img: '/img/avalanche-icon.svg',
		color: '#e84142',
		rpc: 'https://api.avax.network/ext/bc/C/rpc',
		explorer: 'https://snowtrace.io/token/',
		normaltx: 'https://api.snowtrace.io/api?module=account&action=txlist&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		tokentx: 'https://api.snowtrace.io/api?module=account&action=tokentx&address=WALLET_ADDRESS&startblock=START_BLOCK&sort=asc',
		erc721tx: null,
		tokenbalance: 'https://api.snowtrace.io/api?module=account&action=tokenbalance&contractaddress=CONTRACT_ADDRESS&address=WALLET_ADDRESS&tag=latest',
		url_data: '', // SERVER_URL + '/traderjoe',
		tokenContract: '0x0',
		tokenSymbol: 'AVAX',
		tokenName: 'Avalanche',
		tokenDecimal: 18,
		tokenPriceContract: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
		subgraph_url: 'https://thegraph.com/hosted-service/subgraph/traderjoe-xyz/exchange',
		coingecko_name: 'avalanche'
	},
}

const minABI = [
	// balanceOf
	{
		'constant':true,
		'inputs':[{'name':'_owner','type':'address'}],
		'name':'balanceOf',
		'outputs':[{'name':'balance','type':'uint256'}],
		'type':'function'
	},
	// decimals
	{
		'constant':true,
		'inputs':[],
		'name':'decimals',
		'outputs':[{'name':'','type':'uint8'}],
		'type':'function'
	},
	// allowance
	{
		'constant':true,
		'inputs':[{'name':'owner','type':'address'},{'name':'spender','type':'address'}],
		'name':'allowance',
		'outputs':[{'name':'amount','type':'uint256'}],
		'type':'function'
	},
	// approve
	{
		'constant':true,
		'inputs':[{'name':'spender','type':'address'},{'name':'amount','type':'uint256'}],
		'name':'approve',
		'outputs':[{'name':'','type':'bool'}],
		'type':'function'
	}
]

const nftABI = [
	// balanceOf
	{
		'constant':true,
		'inputs':[{'name':'_owner','type':'address'}],
		'name':'balanceOf',
		'outputs':[{'name':'balance','type':'uint256'}],
		'type':'function'
	},
	// decimals
	{
		'constant':true,
		'inputs':[],
		'name':'decimals',
		'outputs':[{'name':'','type':'uint8'}],
		'type':'function'
	},
	// tokenURI
	{
		'constant':true,
		'inputs':[{'name':'_tokenId','type':'uint256'}],
		'name':'tokenURI',
		'outputs':[{'name':'','type':'string'}],
		'type':'function'
	},
	// tokenOfOwnerByIndex
	{
		'constant':true,
		'inputs':[{'name':'_owner','type':'address'}, {'name':'_index','type':'uint256'}],
		'name':'tokenOfOwnerByIndex',
		'outputs':[{'name':'tokenId','type':'uint256'}],
		'type':'function'
	}
]


let web3 = null
let walletAddress = []
let wallet = {}
let wallet_NFT = {}

let gasIsRealtime = false
let loadingChartsByAddress = false



// Utils
async function get(url, query = null) {
	if(query) {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query })
			})
				.then((response) => response.json())
				.then(resolve)
				.catch(reject)
		})
	}
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((response) => response.json())
			.then(resolve)
			.catch(reject)
	})
}

Object.defineProperty(BigInt.prototype, "toJSON", {
	get() {
		"use strict"
		return () => String(this)
	}
})



document.addEventListener('DOMContentLoaded', function() {
	web3 = {}

	const url = window.location.href
	if(url.includes('charts') || url.includes('wallet')) {
		Object.keys(NETWORK).sort(sortByChainId).forEach((network) => {
			web3[network] = new Web3(NETWORK[network].rpc)
			setGas(network)
		})

		setTimeout(updateGas, 5000)
	}
})


const updateGas = (network) => {
	if(!network) {
		// randomly select a network to update gas
		network = Object.keys(NETWORK)[Math.floor(Object.keys(NETWORK).length * Math.random())]
		setTimeout(updateGas, gasIsRealtime ? 750 : 5000)
	}

	let web3 = getWeb3(network)
	if(web3) {
		try {
			web3.eth.getGasPrice().then(gas => {
				const gwei = gasRound(web3.utils.fromWei(gas, 'gwei'))
				const li = document.getElementById(`gas-${network}`)
				const span = document.getElementById(`gas-value-${network}`)
				span.innerHTML = gwei
				li.title = gwei + ' gwei' + (gwei > 1 ? 's' : '') + ' on ' + NETWORK[network].name
			}, error => {})
		} catch {}
	}
}

const setGas = (network) => {
	const ul = document.getElementById('gas-list')
	const li = document.createElement('li')
	li.id = `gas-${network}`
	li.innerHTML = ''
	let span = document.createElement('span')
	span.classList.add('gas-network')
	span.appendChild(createNetworkImg(network))
	li.appendChild(span)
	span = document.createElement('span')
	span.classList.add('gas-value')
	span.id = `gas-value-${network}`
	li.appendChild(span)
	ul.appendChild(li)

	updateGas(network)
}





// get simple data prices
// param: network, callback function
function getSimpleData(network, callback) {
	let xmlhttp = new XMLHttpRequest()
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const simple = JSON.parse(this.responseText)
			if(simple && Object.keys(simple).length > 0) {
				NETWORK[network].simple_data = simple

				if (callback && typeof callback === 'function') {
					callback()
				}
			}
		}
	}
	xmlhttp.onerror = function() {
		// console.log('getSimpleData', this)
	}
	xmlhttp.open('GET', NETWORK[network].url_data + '/simple', true)
	xmlhttp.send()
}


// get charts by address and network
// params: address, network, callback function
function getChartsByAddress(address, interval, network, callback) {
	let xmlhttp = new XMLHttpRequest()
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			const charts = JSON.parse(this.responseText)
			if(charts && Object.keys(charts).length > 0) {
				loadingChartsByAddress = false
				sessionStorage.setItem(network + '-' + address, JSON.stringify(charts))
				sessionStorage.setItem(network + '-' + address + '-lastFetch', new Date().getTime())

				if (callback && typeof callback === 'function') {
					callback()
				}
			}
		}
	}
	xmlhttp.onerror = function() {
		// console.log('getChartsByAddress', this)
	}
	xmlhttp.open('GET', NETWORK[network].url_data + '/charts/' + address + '?interval=' + interval, true)
	xmlhttp.send()
	loadingChartsByAddress = true
}


// get charts by address and network
// params: address, network, callback function
async function getChartsByAddresses(tokenA, tokenB, interval, network) {
	return new Promise((resolve, reject) => {
		fetch(NETWORK[network].url_data + '/charts/' + tokenA + '/' + tokenB + '?interval=' + interval)
			.then((response) => response.json())
			.then(resolve)
			.catch(reject)
	})
}



if(document.getElementById('gas-realtime-button')) {
	document.getElementById('gas-realtime-button').addEventListener('click', (e) => {
		gasIsRealtime = !gasIsRealtime
		let element = e.target.id ? e.target : e.target.parentElement
		element.classList.toggle('active', gasIsRealtime)
	})
}




/* Utils - Return the web3 to use depending on the network */
const getWeb3 = (network) => {
	return web3[network]
}


// Remove the EIP-3770 prefix if needed
// eth:0x123456 => 0x123456
const unprefixAddress = (address) => {
	return unprefixENSAddress(address?.includes(':') ? address.split(':')[1] : address)
}

const unprefixENSAddress = (address) => {
	return address?.includes('|') ? address.split('|')[1] : address
}

const keepENSName = (address) => {
	return address?.includes('|') ? address.split('|')[0] : address
}


// Get token balance
const getTokenBalanceWeb3 = async (contractAddress, address, network) => {
	if(!contractAddress.length || !address) return
	let contract = new (getWeb3(network).eth).Contract(minABI, contractAddress)
	try {
		return await contract.methods.balanceOf(unprefixAddress(address)).call(async (error, value) => {
			return value
		})
	} catch {}
}

const getTokenDecimals = async (contractAddress, network) => {
	let contract = new (getWeb3(network).eth).Contract(minABI, contractAddress)
	return await contract.methods.decimals().call(async (err, val) => {
		return val
	})
}

const getTokenAllowance = async (contractAddress, ownerAddress, spenderAddress, network) => {
	let contract = new (getWeb3(network).eth).Contract(minABI, contractAddress)
	return await contract.methods.allowance(unprefixAddress(ownerAddress), unprefixAddress(spenderAddress)).call(async (err, val) => {
		return val
	})
}


/* Utils - Create a document network img tag */
const createNetworkImg = (network) => {
	let img = document.createElement('img')
	img.src = NETWORK[network].img
	img.width = '24'
	img.height = '24'
	img.alt = NETWORK[network].name + ' logo'
	img.title = NETWORK[network].name
	img.classList.add('network')
	return img
}


/* Utils - Get Price of Address on Network */
const getPriceByAddressNetwork = async (searchedAddress, balance, network) => {
	if(!searchedAddress || searchedAddress.length === 0) return null


	let address = searchedAddress
	let debt = 1
	let rate = 1
	if(Object.keys(underlyingAssets).includes(network + '-' + searchedAddress)) {
		address = underlyingAssets[network + '-' + searchedAddress].address
		rate = underlyingAssets[network + '-' + searchedAddress].rate
		debt = underlyingAssets[network + '-' + searchedAddress].debt
	}
	let prices = NETWORK[network].simple_data
	if(prices && prices[address] && prices[address].p > 0 && (Date.now() - prices[address].t < TIME_1W)) {
		return prices[address].p * debt * rate
	}

	if(balance > 0) {
		return (await getCoingeckoPrice(address, network)) * debt * rate
	}

	return null
}



/* Calculate percentage change of last 24h */
function getPercentage24h(chart) {
	const chart24h = extract24hChart(chart)
	const first = chart24h[0]
	const last = chart24h[chart24h.length - 1]
	// round with 2 digits after commma
	return Math.round((last.p - first.p) / first.p * 10000) / 100
}

/* Return only last 24h data from a chart */
function extract24hChart(chart) {
	return extractChartByDuration(chart, TIME_24H)
}

/* Return only last data from a chart */
/* Params: chart, duration */
function extractChartByDuration(chart, duration) {
	const last_t = chart[chart.length-1].t
	return chart.filter(({t}) => last_t-t <= duration)
}



/* Utils - Debounce function */
let debounceTimer
function debounce(func, timeout = 500) {
	return (...args) => {
		clearTimeout(debounceTimer)
		debounceTimer = setTimeout(() => { func.apply(this, args) }, timeout)
	}
}


const shortenAddress = (address) => {
	return address.slice(0, 6) + '...' + address.slice(-4)
}

// Round number
const precise = (x) => {
	if(Math.abs(x) > 999) { return Math.round(x) }
	else if(Math.abs(x) > 99) { return Math.round(10*x)/10 }
	else if(Math.abs(x) > 1.09) { return Math.round(100*x)/100 }
	else if(Math.abs(x) > 0.001) { return Math.round(10000*x)/10000 }
	return Number.parseFloat(x).toPrecision(2)
}
const gasRound = (x) => {
	if(x > 19) { return Math.round(x) }
	if(x < 0.1) { return Math.round(1000 * x) / 1000 }
	if(x < 1) { return Math.round(100 * x) / 100 }
	return Math.round(10 * x) / 10
}



// Build a Color from String
const hashCode = (str) => {
	let hash = 0
	for (var i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash)
	}
	return hash
}
const getColorFromString = (str) => {
	return `hsl(${hashCode(str) % 360}, 100%, 45%)`
}
const getColorFromStringWithTransparency = (str, transparency) => {
	return `hsla(${hashCode(str) % 360}, 100%, 45%, ${transparency})`
}


// Sort By ChainId
const sortByChainId = (a, b) => {
	if(NETWORK[a].chainId > NETWORK[b].chainId) return 1
	return -1
}
