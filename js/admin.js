// admin.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DataTable
    $('#quotesTable').DataTable({
        ajax: {
            url: '/api/quotes',
            dataSrc: ''
        },
        columns: [
            { 
                data: 'date',
                render: function(data) {
                    return new Date(data).toLocaleString();
                }
            },
            { 
                data: 'user',
                render: function(data) {
                    return `${data.name}<br>${data.phone}<br>${data.email}`;
                }
            },
            { 
                data: 'items',
                render: function(data) {
                    return data.map(item => 
                        `${item.name} (${item.quantity} × ${item.price} CFA)`
                    ).join('<br>');
                }
            },
            { 
                data: 'total',
                render: function(data) {
                    return `${data} CFA`;
                }
            },
            { 
                data: 'status',
                render: function(data) {
                    const badgeClass = data === 'pending' ? 'bg-warning' : 
                                     data === 'completed' ? 'bg-success' : 'bg-secondary';
                    return `<span class="badge ${badgeClass}">${data}</span>`;
                }
            },
            {
                data: 'id',
                render: function(data) {
                    return `
                        <button class="btn btn-sm btn-primary view-quote" data-id="${data}">View</button>
                        <button class="btn btn-sm btn-success complete-quote" data-id="${data}">Complete</button>
                    `;
                }
            }
        ]
    });

    // Load dashboard stats
    fetch('/api/dashboard-stats')
        .then(response => response.json())
        .then(data => {
            document.getElementById('todayQuotes').textContent = data.todayQuotes;
            document.getElementById('pendingQuotes').textContent = data.pendingQuotes;
            document.getElementById('totalCustomers').textContent = data.totalCustomers;
        });

    // Handle quote actions
    $('#quotesTable').on('click', '.view-quote', function() {
        const quoteId = $(this).data('id');
        viewQuoteDetails(quoteId);
    });

    $('#quotesTable').on('click', '.complete-quote', function() {
        const quoteId = $(this).data('id');
        completeQuote(quoteId);
    });
});

function viewQuoteDetails(quoteId) {
    fetch(`/api/quotes/${quoteId}`)
        .then(response => response.json())
        .then(quote => {
            // Show modal with quote details
            alert(`Quote Details:\nCustomer: ${quote.user.name}\nItems: ${quote.items.length}\nTotal: ${quote.total} CFA`);
        });
}

function completeQuote(quoteId) {
    if (confirm('Mark this quote as completed?')) {
        fetch(`/api/quotes/${quoteId}/complete`, { method: 'POST' })
            .then(() => {
                $('#quotesTable').DataTable().ajax.reload();
            });
    }
}