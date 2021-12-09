import Head from 'next/head'
import { useCallback, useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [adultCount, setAdultCount] = useState(1)

  useAlertOnlineOffline()

  return (
    <div>
      <Head>
        <title>BNCC × tiket</title>
      </Head>

      <main>
        <h1>Hello BNCC</h1>

        <UseStateExample />

        <Pokemon pokemonName="ditto" />

        {/* <UseEffectExample /> */}

        {/* <form
          onSubmit={(event) => {
            event.preventDefault()

            fetch('https://api.instagram.com', {
              method: 'POST',
              body: {
                adultCount,
              },
            })
          }}
        >
          <label htmlFor="adult">Adult</label>

          <input
            type="number"
            id="adult"
            name="adult"
            min={1}
            value={adultCount}
            onChange={(event) => {
              setAdultCount(event.target.value)
            }}
          />
        </form> */}
      </main>
    </div>
  )
}

function Pokemon({ pokemonName }) {
  // replace ini semua dengan react-query
  const [pokemon, setPokemon] = useState()
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    async function fetchData() {
      const pokemonFromApi = await fetch(
        'https://pokeapi.co/api/v2/pokemon/' + pokemonName
      ).then((res) => res.json())

      if (isMounted.current) {
        setPokemon(pokemonFromApi)
      }
    }

    fetchData()

    return () => {
      isMounted.current = false
    }
  }, [pokemonName])

  return <pre>{JSON.stringify(pokemon, null, 2)}</pre>
}

function UseStateExample() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}

function UseEffectExample() {
  useEffect(() => {
    function onOnline() {
      alert('Online again 🎉')
    }

    function onOffline() {
      alert('Oh no call Indihome 😨')
    }

    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)

    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [])

  return <div>useEffect example</div>
}

function useAlertOnlineOffline() {
  const [onlineCount, setOnlineCount] = useState(0)
  const [offlineCount, setOfflineCount] = useState(0)

  const onOnline = useCallback(() => {
    const nextOnlineCount = onlineCount + 1
    setOnlineCount(nextOnlineCount)
    alert(`Online again 🎉, times comes back online: ${nextOnlineCount}`)
  }, [onlineCount])

  const onOffline = useCallback(() => {
    const nextOfflineCount = offlineCount + 1
    setOfflineCount(nextOfflineCount)
    alert(`Oh no call Indihome 😨, times went offline: ${nextOfflineCount}`)
  }, [offlineCount])

  useEffect(() => {
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)

    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [onOffline, onOnline])
}
