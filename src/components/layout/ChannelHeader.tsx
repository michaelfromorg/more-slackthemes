import { Button } from "@/components/ui/button";
import { Hash, Info, Star, UserPlus } from "lucide-react";

export function ChannelHeader() {
  return (
    <div className="border-b border-gray-200 px-4 py-2">
      {/* Channel title row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <button className="flex items-center hover:text-gray-600 font-bold">
              <Hash className="w-4 h-4 mr-1" />
              <span>general</span>
            </button>
            <button className="ml-2 text-gray-500 hover:text-gray-600">
              <Star className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-600"
          >
            <UserPlus className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-600"
          >
            <Info className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Channel description row */}
      <div className="mt-1 text-sm text-gray-500 flex items-center">
        <span>
          Company-wide announcements and work-based matters. (Hint: use your
          arrow keys to navigate themes.)
        </span>
      </div>
    </div>
  );
}
