import { useState,  useRef, useEffect } from "react"

export default function App() {

	const [score, setScore] = useState(0)
	const [time, setTime] = useState(10)
	const [game, setGame] = useState("menu")
	const [leaderboard, setLeaderboard] = useState<string[]>([])

	const intervalRef = useRef<number | null>(null)


	useEffect(() => {
		const endGame = () => {
			if (time === 0) {
				setGame("end")
			const newScore = String(score)
				setLeaderboard([...leaderboard, newScore] )
				
			}	

		}
		endGame()
	}, [time])
	

	const handleStart = () => {
		setScore(0)
		setTime(10)
		setGame('playing')
		intervalRef.current = setInterval(() => {
			setTime(prev => {
				if (prev <= 1) {
					clearInterval(intervalRef.current!)
					return 0
				}
				return prev - 1
			})
		}, 1000)

		return() => {if(intervalRef.current) clearInterval(intervalRef.current)}

	}

	const handlePlay = () => {
		setScore(c => c + 1)
	}

	if (game === "menu") {
		return (
			<div className="flex items-center min-h-screen flex-col max-w-md mx-auto p-2 ">
				<h1 className="text-6xl font-semibold mb-8 text-gray-300">clicker</h1>
				<p className="text-lg mt-auto mb-8 font-mono text-gray-300">
					Click <span className=" text-3xl font-sans font-extrabold">gm</span> as much as you can.
				</p>
				<button
					onClick={handleStart}
					className="px-6 py-3 font-mono font-semibold bg-fuchsia-800 text-lg rounded-sm mb-8 hover:bg-fuchsia-900">
					Start Clicker
				</button>
			</div>
		);
	}

	if (game === "playing") {
		return (
			<div className="flex justify-center items-center min-h-screen flex-col">
				<h1 className="text-3xl font-semibold">Time left: {time}</h1>
				<p className="text-lg text-gray-300 font-semibold py-3">It's a good day to GM. Let's go!</p>
				<button onClick={handlePlay}  className="h-80 w-80 font-semibold bg-fuchsia-800 my-8 hover:bg-fuchsia-900 rounded-full text-7xl hover:h-81 hover:w-81 font-sans ">gm</button>
				<p className="text-3xl font-semibold">{score} {score < 20 ? "😴" : score > 40 ?"🏅":"🤨"}</p>
			</div>
		);
	}

  return (
		<div className="flex justify-center items-center min-h-screen flex-col">
			<p className="text-3xl font-semibold my-3">
				{score < 20
					? "C'mon bro, you can do better 😏"
					: score > 40
					? "You're a Legend! 🤘"
					: "Great work 👌"}{" "}
			</p>
			<h1 className="text-lg text-gray-300 font-semibold animate-pulse">
				Final Score: {score}
			</h1>
			<div className="bg-gray-900 max-w-sm w-full rounded-sm font-mono p-4 mt-4 text-gray-300">
				<p className="text-lg ">Best score</p>
				{leaderboard ? (
					leaderboard.map((e, i) => {
						if (i + 1 <= 4) {
							return (
								<div key={i}>
									{i + 1}. {e}
								</div>
							);
						} else {
							setLeaderboard([`${score}`]);
						}
					})
				) : (
					<p>Give it your best short</p>
				)}
			</div>
			<button
				onClick={() => {
					handleStart();
				}}
				className="px-6 py-3 font-mono font-semibold bg-fuchsia-800 text-lg rounded-sm my-8 hover:bg-fuchsia-900">
				Play again
			</button>
		</div>
	);
}
