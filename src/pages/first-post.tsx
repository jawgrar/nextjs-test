import React from "react";
import Link from "next/link";
import Head from "next/head";
import Script from 'next/script';
import { getSortedPostsData } from '../../lib/posts';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}

// export async function getServerSideProps(context) {
//     const res = await fetch('https://6f13bbd2-75ce-4fb4-89df-6cec5b31a41c.mock.pstmn.io/api/test')
//     const JSON = await res.json()
//     const data = JSON.data;
//     return {
//       props: {
//         // props for your component
//         data
//       },
//     };
//   }

export default function FirstPost({ allPostsData, data }: any) {
    const handleOnLoad = () =>
        console.log(`script loaded correctly, window.FB has been populated`);

    return (
        <>
            <Head>
                <title>First Post</title>
            </Head>
            <Script
                src="https://connect.facebook.net/en_US/sdk.js"
                strategy="lazyOnload"
                onLoad={handleOnLoad}
            />
            <h1>First Post</h1>
            <h2>
                <Link href="/">Back to home</Link>
            </h2>
            <section>
                <h2>Blog</h2>
                <ul>
                    {allPostsData.map(({ id, date, title }: any) => (
                        <li key={id}>
                            {title}
                            <br />
                            {id}
                            <br />
                            {date}
                        </li>
                    ))}
                </ul>
            </section>
            <pre>{data}</pre>
        </>
    );
}
