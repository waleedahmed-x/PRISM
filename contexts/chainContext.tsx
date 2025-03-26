import React, { createContext, useContext, useState } from 'react'
import { usePrivy } from '@privy-io/expo'
import { ethers } from 'ethers'
import axios from 'axios'

interface ChainContextType {
  supportedChains: Array<number>
  providers: Record<number, ethers.providers.JsonRpcProvider>
  signers: Record<number, ethers.Signer> | null
  readerContracts: Record<string, Record<number, ethers.Contract>>
  writerContracts: Record<string, Record<number, ethers.Contract>>
  duelRate: number
}

const providers: Record<number, any> = {
  1: new ethers.providers.JsonRpcProvider(
    'https://mainnet.infura.io/v3/2a25220da34549a587445e85bc58ca12'
  ),
  56: new ethers.providers.JsonRpcProvider(
    'https://bsc-mainnet.infura.io/v3/2a25220da34549a587445e85bc58ca12'
  ),
}

const ERC20Abi = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function symbol() view returns (string)',
  'function transfer(address to, uint amount) returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint amount)',
]

const defaultChainContext: ChainContextType = {
  supportedChains: [1, 56],
  providers,
  signers: null,
  readerContracts: {
    DUEL: {
      1: new ethers.Contract(
        '0x943Af2ece93118B973c95c2F698EE9D15002e604',
        ERC20Abi,
        providers[1]
      ),
      56: new ethers.Contract(
        '0xa1ED0bD9A4776830c5b7bA004F26427b71152CA5',
        ERC20Abi,
        providers[56]
      ),
    },
  },
  writerContracts: null,
  duelRate: 0.1,
}

const ChainContext = createContext<ChainContextType>(defaultChainContext)

interface ChainProviderProps {
  children: React.ReactNode
}

export const ChainProvider: React.FC<ChainProviderProps> = ({ children }) => {
  const [chainContext, setChainContext] =
    useState<ChainContextType>(defaultChainContext)

  const asyncFetch = async () => {
    try {
      // const response = await axios.get(
      //   'https://deep-index.moralis.io/api/v2.2/erc20/0x943Af2ece93118B973c95c2F698EE9D15002e604/price',
      //   {
      //     params: {
      //       chain: 'eth',
      //       exchange: 'uniswapv2',
      //       include: 'percent_change',
      //     },
      //     headers: {
      //       accept: 'application/json',
      //       'X-API-Key':
      //         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6Ijg5ZjdhM2MyLTQ3MzEtNGExMS1hMmFlLTNmYWI2YjM0NGRkMCIsIm9yZ0lkIjoiMzcyMjkwIiwidXNlcklkIjoiMzgyNjAyIiwidHlwZUlkIjoiMjFkOGMzMmQtZjE0Mi00YjgwLTkwZTAtZDM3YjdmOWI4NjNiIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDUyNTcyMjksImV4cCI6NDg2MTAxNzIyOX0.ixTSeRWg6V6amu1hl_BtzgwUlw11Iddh00_4tVbKSDg',
      //     },
      //   }
      // )
      // console.log(response.data.usdPrice)

      // setChainContext((prev) => ({
      //   ...prev,
      //   duelRate: response.data.usdPrice,
      // }))
    } catch (e) {
      console.error(e)
    }
  }
  asyncFetch()

  return (
    <ChainContext.Provider value={chainContext}>
      {children}
    </ChainContext.Provider>
  )
}

export const useChainContext = () => useContext(ChainContext)
