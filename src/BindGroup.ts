type ShaderStage = "VERTEX" | "FRAGMENT" | "COMPUTE"

export interface BindingProps {
	type?: GPUBufferBindingType | undefined
	visibility: ShaderStage[]
	buffer: GPUBuffer
	externalTexture?: GPUExternalTextureBindingLayout | undefined
	sampler?: GPUSamplerBindingLayout | undefined
	storageTexture?: GPUStorageTextureBindingLayout | undefined
	texture?: GPUTextureBindingLayout | undefined
}

export interface Binding extends BindingProps {
	bindGroupLayoutEntry: (binding: number) => GPUBindGroupLayoutEntry
	bindGroupEntry: (binding: number) => GPUBindGroupEntry
}

function isBinding(object: any): object is Binding {
	return "bindGroupLayoutEntry" in object
}

export const Binding = (props: BindingProps): Binding => {
	const bindGroupLayoutEntry = (binding: number): GPUBindGroupLayoutEntry => {
		return {
			binding,
			visibility: props.visibility.reduce((acc, stage) => {
				return acc | GPUShaderStage[stage]
			}, 0),
			buffer: { type: props.type },
			externalTexture: props.externalTexture,
			sampler: props.sampler,
			storageTexture: props.storageTexture,
			texture: props.texture,
		}
	}
	const bindGroupEntry = (binding: number): GPUBindGroupEntry => {
		return {
			binding,
			resource: {
				buffer: props.buffer,
			},
		}
	}

	return {
		...props,
		bindGroupLayoutEntry,
		bindGroupEntry,
	}
}

export interface Group {
	getLayoutEntries: () => GPUBindGroupLayoutEntry[]
	getEntries: () => GPUBindGroupEntry[]
}

function isGroup(object: any): object is Group {
	return "getLayoutEntries" in object
}

export const Group = (Bindings: Binding[]): Group => {
	const getLayoutEntries = () =>
		Bindings.map((Binding, binding) => Binding.bindGroupLayoutEntry(binding))
	const getEntries = () =>
		Bindings.map((Binding, binding) => Binding.bindGroupEntry(binding))
	return {
		getLayoutEntries,
		getEntries,
	}
}

export interface BindGroupDescriptor {
	label?: string
	group: Group
}

function isBindGroupDescriptor(object: any): object is BindGroupDescriptor {
	return "group" in object
}

export const BindGroup = (
	device: GPUDevice,
	descriptor: BindGroupDescriptor | Group | Binding[]
) => {
	if (Array.isArray(descriptor)) {
		if (isBinding(descriptor[0])) {
			const group = Group(descriptor)
			const layout = device.createBindGroupLayout({
				entries: group.getLayoutEntries(),
			})
			return {
				bindGroup: device.createBindGroup({
					layout,
					entries: group.getEntries(),
				}),
				layout,
			}
		}
	}
	if (isGroup(descriptor)) {
		const layout = device.createBindGroupLayout({
			entries: descriptor.getLayoutEntries(),
		})
		return {
			bindGroup: device.createBindGroup({
				layout,
				entries: descriptor.getEntries(),
			}),
			layout,
		}
	}
	if (isBindGroupDescriptor(descriptor)) {
		const layout = device.createBindGroupLayout({
			entries: descriptor.group.getLayoutEntries(),
		})
		return {
			bindGroup: device.createBindGroup({
				label: descriptor.label,
				layout,
				entries: descriptor.group.getEntries(),
			}),
			layout,
		}
	}
}
