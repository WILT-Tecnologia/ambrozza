export function getInputClasses(control: any): string {
  const isInvalid = !!(control && control.invalid && (control.touched || control.dirty));
  const base =
    'w-full px-4.5 py-3 rounded-2xl border text-stone-900 text-sm focus:outline-none focus:ring-2 transition-all font-medium';

  if (isInvalid) {
    return `${base} border-rose-500 bg-rose-50/30 focus:ring-rose-500/15`;
  }

  return `${base} border-stone-200 bg-stone-50/50 focus:border-amber-800 focus:bg-white focus:ring-amber-800/10`;
}

export function getGroupClasses(control: any): string {
  const isInvalid = !!(control && control.invalid && (control.touched || control.dirty));
  const base = 'flex rounded-2xl border overflow-hidden transition-all';

  if (isInvalid) {
    return `${base} border-rose-500 bg-rose-50/30 ring-2 ring-rose-500/10`;
  }

  return `${base} border-stone-200 bg-stone-50/50 focus-within:border-amber-800 focus-within:ring-2 focus-within:ring-amber-800/10`;
}

export function getLabelClasses(isInvalid: boolean): string {
  const base =
    'flex items-start gap-4 p-4.5 rounded-2xl border transition-all bg-white shadow-xs cursor-pointer';

  if (isInvalid) {
    return `${base} border-rose-500`;
  }

  return `${base} border-stone-200/90 hover:border-amber-800/40 hover:bg-amber-50/20`;
}
