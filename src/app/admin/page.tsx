import DashboardCard from '@/components/DashboardCard';
import { getProductsData, getSalesData, getUsersData } from '@/lib/admin';
import { formatCurrency, formatNumber } from '@/lib/formatters';

const AdminPage = async () => {
    const [salesData, usersData, productsData] = await Promise.all([
        getSalesData(),
        getUsersData(),
        getProductsData(),
    ]);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <DashboardCard
                title='Sales'
                subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
                body={formatCurrency(salesData.amount)}
            />
            <DashboardCard
                title='Customers'
                subtitle={`${formatCurrency(usersData.averageValuePerUser)} Average Value`}
                body={formatNumber(usersData.userCount)}
            />
            <DashboardCard
                title='Active Products'
                subtitle={`${formatNumber(productsData.inactiveCount)} Inactive`}
                body={formatNumber(productsData.activeCount)}
            />
        </div>
    );
};

export default AdminPage;
