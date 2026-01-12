// util untuk load tiptap table extensions secara robust (dynamic import + export-shape handling)
export async function loadTiptapTableExtensions() {
  try {
    const TableModule = await import('@tiptap/extension-table');
    const TableRowModule = await import('@tiptap/extension-table-row');
    const TableHeaderModule = await import('@tiptap/extension-table-header');
    const TableCellModule = await import('@tiptap/extension-table-cell');

    const resolve = (mod, config) => {
      if (!mod) return null;
      // handle default / named / module itself
      const candidate = mod.default || mod.Table || mod;
      if (!candidate) return null;
      // if has configure, try to configure (preferred)
      if (candidate.configure && typeof candidate.configure === 'function') {
        try {
          return candidate.configure(config || {});
        } catch (err) {
          // fallback to candidate itself
          // eslint-disable-next-line no-console
          console.warn('Failed to configure extension, falling back to raw export', err);
        }
      }
      return candidate;
    };

    const TableExt = resolve(TableModule, { resizable: true });
    const TableRow = resolve(TableRowModule);
    const TableHeader = resolve(TableHeaderModule);
    const TableCell = resolve(TableCellModule);

    const arr = [TableExt, TableRow, TableHeader, TableCell].filter(Boolean);
    return arr;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error loading tiptap table extensions:', err);
    return [];
  }
}
