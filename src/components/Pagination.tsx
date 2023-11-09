import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts';
import { useCallback } from 'react';
import { filtersActions } from '@/store/slices/FiltersSlice.ts';
import Button from '@/components/Button.tsx';

const NumberButtonsStyle = {
	secondary: 'h-10 w-10 p-2 rounded-xl bg-transparent hover:bg-gray-100',
	active: 'h-10 w-10 p-2 rounded-xl bg-[#58c0fc] text-white cursor-default',
}

const Pagination = () => {
	const dispatch = useAppDispatch();
	const { limit, offset, totalCount } = useAppSelector(state => state.filters)

	const currentPage = Math.floor(offset / limit) + 1;
	const totalPages = Math.ceil(totalCount / limit);

	const onChangePage = useCallback((value?: number) => {
		dispatch(filtersActions.setOffset(value || 0));
	}, [dispatch])

	let content;

	if(!totalPages || totalPages == 1) {
		return undefined;
	} else if (totalPages <= 6) {
		content = (
			<>
				{Array.from(Array(totalPages), (_, i) => {
					const indexPage = i + 1;
					return (
						<Button
							key={i}
							className={currentPage === indexPage ? NumberButtonsStyle.active : NumberButtonsStyle.secondary}
							onClick={() => onChangePage(i * limit)}
							disabled={currentPage === indexPage}
						>
							{indexPage}
						</Button>
					)
				})}
			</>
		)
	} else {
		content = (
            <>
				<Button
					className={currentPage === 1 ? NumberButtonsStyle.active : NumberButtonsStyle.secondary}
					onClick={() => onChangePage(0)}
					disabled={currentPage === 1}
				>
					1
				</Button>
				{currentPage > 3 &&
					<p className="p-2 cursor-default">...</p>
				}
				{currentPage == totalPages &&
					<Button
						className={NumberButtonsStyle.secondary}
						onClick={() => onChangePage(offset - limit * 2)}
					>
						{currentPage - 2}
					</Button>
				}
				{currentPage > 2 &&
					<Button
						className={NumberButtonsStyle.secondary}
						onClick={() => onChangePage(offset - limit)}
					>
						{currentPage - 1}
					</Button>
				}
				{currentPage != 1 && currentPage != totalPages &&
					<Button
						className={NumberButtonsStyle.active}
					>
						{currentPage}
					</Button>
				}
				{currentPage < totalPages - 1 &&
					<Button
						className={NumberButtonsStyle.secondary}
						onClick={() => onChangePage(offset + limit)}
					>
						{currentPage + 1}
					</Button>
				}
				{currentPage == 1 &&
					<Button
						className={NumberButtonsStyle.secondary}
						onClick={() => onChangePage(offset + limit * 2)}
					>
						{currentPage + 2}
					</Button>
				}
				{currentPage < totalPages - 2
					&& <p className="p-2 cursor-default">...</p>
				}
				<Button
					className={currentPage === totalPages ? NumberButtonsStyle.active : NumberButtonsStyle.secondary}
					onClick={currentPage === totalPages ? undefined : () => onChangePage(totalCount - limit)}
				>
					{totalPages}
				</Button>
            </>
        )
	}

	return (
		<>
			{totalPages
				? <div className="flex justify-center mt-6 mb-8 font-semibold text-base h-10 gap-2 items-center">
					{currentPage !== 1 &&
						<Button
							className="p-2 bg-transparent text-[#58c0fc]"
							onClick={() => onChangePage(offset - limit)}
						>
							Назад
						</Button>
					}
					{content}
					{currentPage !== totalPages &&
						<Button
							className="p-2 bg-transparent text-[#58c0fc]"
							onClick={() => onChangePage(offset + limit)}
						>
							Вперед
						</Button>
					}
				</div>
				: null
			}
		</>
	);
};
export default Pagination;
