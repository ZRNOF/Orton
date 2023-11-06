const typeMap = {
	i8: Int8Array,
	i16: Int16Array,
	i32: Int32Array,
	u8: Uint8Array,
	u16: Uint16Array,
	u32: Uint32Array,
	f32: Float32Array,
} as const
type TypeMapKeys = keyof typeof typeMap

const flat = (array: number[]) => {
	return array.flat(Infinity)
}

export const Data = (data: number | number[], type: TypeMapKeys = "f32") => {
	if (Array.isArray(data)) return new typeMap[type](flat(data))
	if (typeof data === "number") return new typeMap[type](data)
	throw new Error("Unsupported data type")
}
