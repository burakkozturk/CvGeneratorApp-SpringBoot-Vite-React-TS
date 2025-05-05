export function formatDateTr(dateString: string) {
    if (!dateString) return '';
    const d = new Date(dateString);
    return d.toLocaleDateString('tr-TR', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  }
  