'use client'
import Image from 'next/image'
import s from './page.module.css'
import { useEffect, useState } from 'react'

interface Item {
	title: string
	tags: string
	codeSource: string
	deployed: string
	isPet?: boolean
}

const items: Item[] = [
	{
		title: 'Startups Platform',
		tags: 'commerce teamwork admin dashboard next next.js nextjs react-hook-form startup styled component styled-component typescript php redux rtk fsd',
		codeSource: '',
		deployed: 'https://startupium.ru',
	},
	{
		title: 'Nutritionist Website',
		tags: 'commerce personal teamwork admin dashboard next next.js nextjs react-hook-form order management programs review language email design tailwind tailwindcss scss module draftjs draft-js react-query sass typescript nest nest.js nestjs nest fs mongo mongodb mongoose nodemailer context',
		codeSource: 'https://github.com/miliereya/dietolog-2.0-client',
		deployed: 'https://ekaterina-dietolog.life',
	},
	{
		title: 'Online Battle City',
		tags: 'Game solo websocket socket remake multiplayer fun scss pet react sound music oop typescript nest nest.js nestjs nest',
		codeSource: 'https://github.com/miliereya/online-battle-city-remake-client',
		deployed: 'https://battle-city-remake.online',
		isPet: true,
	},
	{
		title: 'Agri-Company Landing',
		tags: 'commerce html html5 css css3 javascript card landing solo',
		codeSource: '',
		deployed: 'http://agroexpert.dn.ua',
	},
	{
		title: 'Kids Game (Demo)',
		tags: 'commerce next nextjs next.js react-dnd drag and drop typescript emotion game solo',
		codeSource: 'https://github.com/miliereya/sirius-future-game',
		deployed: 'https://sirius-future-game.vercel.app',
	},
	{
		title: 'Food Market',
		tags: 'solo typescript javascript express market mongo css express js mongodb mobx react products cart',
		codeSource: 'https://github.com/miliereya/pet-safira-client',
		deployed: 'https://safira-market.vercel.app/',
		isPet: true,
	},
	{
		title: 'Sofa Market',
		tags: 'teamwork php jquery market shop e-commerce commerce',
		codeSource: '',
		deployed: 'https://divankiev.ua',
	},
	{
		title: 'Pizza Delivery',
		tags: 'teamwork php jquery market shop e-commerce commerce',
		deployed: '	https://pizzasmile.by',
		codeSource: '',
	},
	{
		title: 'Chat App',
		tags: 'react typescript styled teamwork websocket socket typescript nestjs nest nest.js mongo connections multi platform multi-platform files upload design jest test unit broadcast',
		codeSource: 'https://github.com/miliereya/pet-chat',
		deployed: 'https://in-tou-ch.vercel.app',
		isPet: true,
	},
]

const placeHolderValues = [
	'Next.js ',
	'Teamwork ',
	'Websocket ',
	'Nest.js ',
] as const

const sortHandler = (item: Item, val: string) => {
	if (val[0] === ' ') val = val.slice(1)
	if (val[val.length - 1] === ' ') val = val.slice(0, -1)
	const valArr = val.toLowerCase().split(' ')
	for (let i = 0; i < valArr.length; i++) {
		if (
			!item.tags.toLowerCase().includes(valArr[i]) &&
			!item.title.toLowerCase().includes(valArr[i])
		) {
			return false
		}
	}
	return true
}

export default function Home() {
	const [placeHolder, setPlaceHolder] = useState('')
	const [valueToPlaceHolders, setValueToPlaceHolders] = useState('')
	const [valueNum, setValueNum] = useState(0)
	const [search, setSearch] = useState('')

	const searchHandler = (val: string) => {
		if (val) {
			setPlaceHolder('')
			setValueToPlaceHolders('')
		}
		setSearch(val)
	}
	useEffect(() => {
		if (search) return
		const timer = setTimeout(() => {
			if (search) return
			setValueToPlaceHolders((prev) => {
				if (prev.length === 0) {
					setPlaceHolder('')
					if (valueNum === 4) {
						setValueNum(0)
						return placeHolderValues[0]
					} else {
						setValueNum((prevValueNum) => prevValueNum + 1)
						return placeHolderValues[valueNum]
					}
				} else {
					setPlaceHolder((currentPlaceHolder) => currentPlaceHolder + prev[0])
					return prev.substring(1)
				}
			})
		}, 400)
		return () => clearTimeout(timer)
	}, [valueToPlaceHolders, valueNum, search])

	return (
		<div className={s.main}>
			<div className={s.content_wrapper}>
				<h1 className={s.h1}>Miliereya&apos;s projects</h1>
				<div className={s.link_container}>
					<div className={s.link_wrapper}>
						<a
							href='https://stackoverflow.com/users/22912119/miliereya'
							className={s.link}
							target='_blank'
						>
							Stack Overflow
						</a>
						<a
							href='https://www.linkedin.com/in/web-daniil-shvedov/'
							className={s.link}
							target='_blank'
						>
							Linked In
						</a>
					</div>
					<div className={s.link_wrapper_2}>
						<a
							href='https://github.com/miliereya'
							className={s.link}
							target='_blank'
						>
							Github
						</a>
						<a
							href='https://leetcode.com/miliereya/'
							className={s.link}
							target='_blank'
						>
							Leet Code
						</a>
					</div>
				</div>
				<div className={s.top_wrapper}>
					<div className={s.search_wrapper}>
						<input
							value={search}
							onChange={(e) => searchHandler(e.target.value)}
							className={s.input}
							placeholder={placeHolder}
							maxLength={20}
						/>
						<div className={s.icon_wrapper}>
							<Image
								src='/search.png'
								className={s.search_icon}
								width={50}
								height={50}
								alt='search'
							/>
						</div>
					</div>
					<a
						rel='stylesheet'
						href='/web developer (Daniil Shvedov).pdf'
						download='web developer (Daniil Shvedov).pdf'
						className={s.download_button}
					>
						Download Resume
						<Image
							src='/download.png'
							className={s.download_icon}
							width={50}
							height={50}
							alt='search'
						/>
					</a>
				</div>
				{items
					.filter((i) => sortHandler(i, search))
					.map(({ title, codeSource, deployed, isPet }) => (
						<div key={title} className={s.item}>
							<p className={s.title}>{title}</p>
							<p className={s.span}>{!isPet && '(e-commerce)'}</p>
							<div className={s.buttons_wrapper}>
								{deployed && (
									<a href={deployed} target='_blank' className={s.button}>
										Website Link
									</a>
								)}
								{codeSource && (
									<a href={codeSource} target='_blank' className={s.button}>
										Source
									</a>
								)}
							</div>
						</div>
					))}
			</div>
		</div>
	)
}
