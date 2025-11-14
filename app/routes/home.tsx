import type { LoaderFunctionArgs } from 'react-router';
import SidebarContent from '~/components/layout/sidebar/SidebarContent';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '~/components/ui/resizable';
import { requireAuth } from '~/services/session.server';

export async function loader({ request }: LoaderFunctionArgs) {
  return await requireAuth(request);
}

const Home = () => {
  const selectedChat = true;

  return (
    <>
      <div className="min-h-screen w-full hidden md:flex flex-row chat-bg">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={25}
            minSize={20}
            maxSize={30}
            className="border-r bg-background z-10"
          >
            <SidebarContent />
          </ResizablePanel>

          <ResizableHandle className="bg-border" />

          <ResizablePanel>
            <div
              className={`h-screen flex-1 ${
                !selectedChat ? 'hidden md:flex' : 'flex'
              } flex-col`}
            >
              <>CHAT WINDOW</>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="chat-bg h-full w-full flex flex-col md:hidden">
        {!selectedChat ? <>SIDE BAR CONTENT</> : <>CHAT WINDOW</>}
      </div>
    </>
  );
};

export default Home;
