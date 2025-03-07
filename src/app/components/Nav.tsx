import { Button } from "@/components/ui/button"
import { Sun } from 'lucide-react';

const Nav = () => {
    return (
        <div className="flex justify-between px-10 py-8">
            <h2 className=" text-3xl font-extrabold ">Text Behind Image</h2>
            <Button className=" text-base font-medium" variant="ghost">
                <Sun />
                Light Mode
            </Button>
        </div>
    );
};

export default Nav;
