import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata={title:'Qiaoyuan Zheng | LLM Evaluation & Privacy',description:'Qiaoyuan Zheng is an MSc student in Data Science at ETH Zürich researching reliable LLM evaluation, interpretable capabilities, and privacy in language agents.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
