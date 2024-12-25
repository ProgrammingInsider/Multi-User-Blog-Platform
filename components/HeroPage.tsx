
const HeroPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-11/12 max-w-5xl mx-auto h-[50vh]">
        <h1 className="heading text-center text-2xl sm:text-3xl">Empower Voices, Share Stories</h1>
        <p className="para text-center max-w-2xl text-sm my-4 sm:text-base">Create, share, and explore a community-driven blog platform where everyone has a voice. Join today and start publishing your ideas in a collaborative space.</p>
        <form className="myBorder mt-3 rounded-lg p-1 flex flex-wrap justify-center gap-2">
            <input type="text" className="input border-0" placeholder="search..."/>
            <input type="submit" value={"Search"} className="primaryBtn primaryBtnText" />
        </form>
    </div>
  )
}

export default HeroPage