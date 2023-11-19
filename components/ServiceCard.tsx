export default function ServiceCard(params:any) {
    return(
        <section className="bg-slate-400 dark:bg-gray-900 my-4 rounded-lg h-50">
            <a href={params.url}>
                <div className="flex grid max-w-screen-xl px-4 py-4 mx-auto grid-cols-2">
                    <div className="mx-auto place-self-center flex">
                        <img src={params.imgSource} alt="img" className="h-20 my-auto"/>
                    </div>  
                    <h1 className="my-auto text-2xl font-bold leading-none md:text-2xl xl:text-2xl dark:text-white">{params.title}</h1>
                </div>
            </a>
        </section>
    );
}