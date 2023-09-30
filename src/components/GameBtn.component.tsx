import Link from "next/link"
import { FC } from "react"

interface IGameBtnProps {
    text: string
    link: string
}
export const GameBtn:FC<IGameBtnProps> = ({text, link}) => {
    return <Link href={link} className=" bg-slate-200 text-center p-4 rounded-lg">{text}</Link>
}