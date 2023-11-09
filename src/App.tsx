import Filters from '@/components/Filters.tsx';
import ProductTable from '@/components/ProductTable.tsx';
import Pagination from '@/components/Pagination.tsx';

function App() {
	return (
		<main className="flex min-h-screen flex-col bg-white">
			<Filters/>
			<div className="container mx-auto mt-28 px-12 py-2">
				<section>
					<ProductTable/>
					<Pagination/>
				</section>
			</div>
		</main>
	)
}

export default App
