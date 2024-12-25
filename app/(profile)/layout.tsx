import SideMenu from "@/components/SideMenu";

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <main className='flex overflow-x-hidden'>
        <SideMenu/>
        <section className="sectionBg p-4 ml-14 sm:ml-0 w-[95%] min-h-screen sm:w-screen">
          {children}
        </section>
    </main>
  )
}

export default layout