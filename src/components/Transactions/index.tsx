import { useCallback } from "react"
import { useCustomFetch } from "src/hooks/useCustomFetch"
import { SetTransactionApprovalParams } from "src/utils/types"
import { TransactionPane } from "./TransactionPane"
import { SetTransactionApprovalFunction, TransactionsComponent } from "./types"

export const Transactions: TransactionsComponent = ({ transactions }) => {
  const { fetchWithoutCache, fetchWithCache, loading } = useCustomFetch()

  const setTransactionApproval = useCallback<SetTransactionApprovalFunction>(
    async ({ transactionId, newValue }) => {
      await fetchWithCache<void, SetTransactionApprovalParams>("setTransactionApproval", {
        transactionId,
        value: newValue,
      })
    },
    [fetchWithCache]
  )

  if (transactions === null) {
    return <div className="RampLoading--container">Loading...</div>
  }

  return (
    <div data-testid="transaction-container">
      {transactions.map((transaction) => (
        <section key={transaction.id}>
          <div className="RampBreak--l" />
          <TransactionPane
            transaction={transaction}
            loading={loading}
            setTransactionApproval={setTransactionApproval}
          />
        </section>
      ))}
    </div>
  )
}
