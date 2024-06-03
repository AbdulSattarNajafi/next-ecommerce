import Nav from '@/components/Nav';
import NavLink from '@/components/NavLink';

export const dynamic = 'force-dynamic';

const AdminLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Nav>
                <NavLink href='/admin'>Dashboard</NavLink>
                <NavLink href='/admin/products'>Products</NavLink>
                <NavLink href='/admin/users'>Customers</NavLink>
                <NavLink href='/admin/orders'>Sales</NavLink>
            </Nav>

            <div className='container my-6'>{children}</div>
        </>
    );
};

export default AdminLayout;
