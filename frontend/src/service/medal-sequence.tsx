export const ApiMedalSequence = `${process.env.NEXT_PUBLIC_SERVICE}/medal-sequence`;
export const ApiMedalSequenceByUser = `${process.env.NEXT_PUBLIC_SERVICE}/medal-sequence/validate-medal-user`;
export const ApiMedalSequenceId = (id: string) =>
    `${process.env.NEXT_PUBLIC_SERVICE}/medal-sequence/${id}`;
