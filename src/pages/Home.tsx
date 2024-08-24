import React from 'react'

function Home() {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(https://images3.alphacoders.com/112/thumb-1920-1120397.png)",
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <p className="mb-5">
                        This application was developed as part of the selection process to meet the requirements for a job application.
                    </p>
                    <a href='/dashboard' className="btn btn-primary">Go to dashboard</a>
                </div>
            </div>
        </div>
    )
}

export default Home