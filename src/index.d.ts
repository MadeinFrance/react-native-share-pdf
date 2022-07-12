declare module RNShareFile {
	function sharePDF(base64Data: string, documentFileName: string): Promise<Error | void>
}

export default RNShareFile
