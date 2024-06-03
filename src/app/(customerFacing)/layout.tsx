import Nav from '@/components/Nav';
import NavLink from '@/components/NavLink';

export const dynamic = 'force-dynamic';

const CustomersLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Nav>
                <NavLink href='/'>Home</NavLink>
                <NavLink href='/products'>Products</NavLink>
                <NavLink href='/orders'>My Orders</NavLink>
            </Nav>

            <div className='container my-6'>{children}</div>
        </>
    );
};

export default CustomersLayout;
