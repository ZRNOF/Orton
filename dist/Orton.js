const $936f9c0c9519c9e4$var$typeMap = {
    i8: Int8Array,
    i16: Int16Array,
    i32: Int32Array,
    u8: Uint8Array,
    u16: Uint16Array,
    u32: Uint32Array,
    f32: Float32Array
};
const $936f9c0c9519c9e4$var$flat = (array)=>{
    return array.flat(Infinity);
};
const $936f9c0c9519c9e4$export$2d0294657ab35f1b = (data, type = "f32")=>{
    if (Array.isArray(data)) return new $936f9c0c9519c9e4$var$typeMap[type]($936f9c0c9519c9e4$var$flat(data));
    if (typeof data === "number") return new $936f9c0c9519c9e4$var$typeMap[type](data);
    throw new Error("Unsupported data type");
};


const $5dcb00b280cce78c$export$fc0ab3c81b435d2b = (title, detail)=>{
    const errorOverlay = document.createElement("div");
    errorOverlay.style.cssText = `
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.9);
			display: none;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 999;
	`;
    const errorText = document.createElement("div");
    errorText.style.cssText = `
			color: red;
			font-size: 24px;
			text-align: center;
			font-family: 'Consolas', monospace;
	`;
    errorText.innerHTML = `<h2>${title}</h2><p>${detail}</p>`;
    errorOverlay.appendChild(errorText);
    document.body.appendChild(errorOverlay);
    function showErrorOverlay() {
        errorOverlay.style.display = "flex" // Show the error overlay
        ;
    }
    function hideErrorOverlay() {
        errorOverlay.style.display = "none" // Hide the error overlay
        ;
    }
    errorOverlay.addEventListener("click", hideErrorOverlay);
    return {
        show: showErrorOverlay,
        hide: hideErrorOverlay
    };
};


const $c83327048459abbb$export$cb28509c217600d2 = (device, props)=>{
    return {
        module: device.createShaderModule({
            label: props.label,
            code: props.code
        }),
        entryPoint: props.entryPoint || "main",
        buffers: props.buffers
    };
};
const $c83327048459abbb$export$2d38bde43c53f87a = (device, props)=>{
    return {
        module: device.createShaderModule({
            label: props.label,
            code: props.code
        }),
        entryPoint: props.entryPoint || "main",
        targets: props.targets
    };
};
const $c83327048459abbb$export$cdde5429dd049099 = (device, props)=>{
    if (typeof props === "string") return {
        module: device.createShaderModule({
            code: props
        }),
        entryPoint: "main"
    };
    return {
        module: device.createShaderModule({
            label: props.label,
            code: props.code
        }),
        entryPoint: props.entryPoint || "main"
    };
};
const $c83327048459abbb$export$462bb059fed9d9e5 = {
    Vertex: $c83327048459abbb$export$cb28509c217600d2,
    Fragment: $c83327048459abbb$export$2d38bde43c53f87a,
    Compute: $c83327048459abbb$export$cdde5429dd049099
};


const $63f4911f20da9a77$export$a143d493d941bafc = (device, descriptor)=>{
    return device.createBuffer({
        label: descriptor.label,
        size: descriptor.size,
        usage: descriptor.usage.reduce((acc, usage)=>{
            return acc | GPUBufferUsage[usage];
        }, 0)
    });
};


const $c88b6730aafb3233$export$330652b0e7de7308 = ({ format: format, offset: offset, shaderLocation: shaderLocation })=>{
    return {
        format: format,
        offset: offset,
        shaderLocation: shaderLocation
    };
};
const $c88b6730aafb3233$export$ff2c64c5fad693d1 = ({ arrayStride: arrayStride, stepMode: stepMode = "vertex", attributes: attributes })=>{
    return {
        arrayStride: arrayStride,
        stepMode: stepMode,
        attributes: attributes
    };
};


function $c1ba1b8dce2c3978$var$isBinding(object) {
    return "bindGroupLayoutEntry" in object;
}
const $c1ba1b8dce2c3978$export$f4f50f872cf9bd86 = (props)=>{
    const bindGroupLayoutEntry = (binding)=>{
        return {
            binding: binding,
            visibility: props.visibility.reduce((acc, stage)=>{
                return acc | GPUShaderStage[stage];
            }, 0),
            buffer: {
                type: props.type
            },
            externalTexture: props.externalTexture,
            sampler: props.sampler,
            storageTexture: props.storageTexture,
            texture: props.texture
        };
    };
    const bindGroupEntry = (binding)=>{
        return {
            binding: binding,
            resource: {
                buffer: props.buffer
            }
        };
    };
    return {
        ...props,
        bindGroupLayoutEntry: bindGroupLayoutEntry,
        bindGroupEntry: bindGroupEntry
    };
};
function $c1ba1b8dce2c3978$var$isGroup(object) {
    return "getLayoutEntries" in object;
}
const $c1ba1b8dce2c3978$export$eb2fcfdbd7ba97d4 = (Bindings)=>{
    const getLayoutEntries = ()=>Bindings.map((Binding, binding)=>Binding.bindGroupLayoutEntry(binding));
    const getEntries = ()=>Bindings.map((Binding, binding)=>Binding.bindGroupEntry(binding));
    return {
        getLayoutEntries: getLayoutEntries,
        getEntries: getEntries
    };
};
function $c1ba1b8dce2c3978$var$isBindGroupDescriptor(object) {
    return "group" in object;
}
const $c1ba1b8dce2c3978$export$6f452ee382def63c = (device, descriptor)=>{
    if (Array.isArray(descriptor)) {
        if ($c1ba1b8dce2c3978$var$isBinding(descriptor[0])) {
            const group = $c1ba1b8dce2c3978$export$eb2fcfdbd7ba97d4(descriptor);
            const layout = device.createBindGroupLayout({
                entries: group.getLayoutEntries()
            });
            return {
                bindGroup: device.createBindGroup({
                    layout: layout,
                    entries: group.getEntries()
                }),
                layout: layout
            };
        }
    }
    if ($c1ba1b8dce2c3978$var$isGroup(descriptor)) {
        const layout = device.createBindGroupLayout({
            entries: descriptor.getLayoutEntries()
        });
        return {
            bindGroup: device.createBindGroup({
                layout: layout,
                entries: descriptor.getEntries()
            }),
            layout: layout
        };
    }
    if ($c1ba1b8dce2c3978$var$isBindGroupDescriptor(descriptor)) {
        const layout = device.createBindGroupLayout({
            entries: descriptor.group.getLayoutEntries()
        });
        return {
            bindGroup: device.createBindGroup({
                label: descriptor.label,
                layout: layout,
                entries: descriptor.group.getEntries()
            }),
            layout: layout
        };
    }
};


const $c03ab52147b8b08e$export$38d414bb53ca9314 = (device, descriptor)=>{
    if (Array.isArray(descriptor)) return device.createPipelineLayout({
        bindGroupLayouts: descriptor
    });
    else return device.createPipelineLayout(descriptor);
};
const $c03ab52147b8b08e$export$efa01fade62e48fc = (device, descriptor)=>{
    return device.createComputePipeline(descriptor);
};
const $c03ab52147b8b08e$export$52ff0c46af33b1fd = (device, descriptor)=>{
    return device.createRenderPipeline(descriptor);
};
const $c03ab52147b8b08e$export$abd47b564b6c9ce2 = {
    Layout: $c03ab52147b8b08e$export$38d414bb53ca9314,
    Compute: $c03ab52147b8b08e$export$efa01fade62e48fc,
    Render: $c03ab52147b8b08e$export$52ff0c46af33b1fd
};


const $9b01685ef546c50b$export$4e355586494de655 = (commandEncoder, descriptor)=>{
    const computePass = commandEncoder.beginComputePass(descriptor);
    const dispatchWorkgroups = (workgroupCountX, workgroupCountY, workgroupCountZ)=>{
        computePass.dispatchWorkgroups(workgroupCountX, workgroupCountY, workgroupCountZ);
        return methods;
    };
    const dispatchWorkgroupsIndirect = (indirectBuffer, indirectOffset)=>{
        computePass.dispatchWorkgroupsIndirect(indirectBuffer, indirectOffset);
        return methods;
    };
    const end = ()=>{
        computePass.end();
    };
    const insertDebugMarker = (markerLabel)=>{
        computePass.insertDebugMarker(markerLabel);
        return methods;
    };
    const popDebugGroup = ()=>{
        computePass.popDebugGroup();
        return methods;
    };
    const pushDebugGroup = (groupLabel)=>{
        computePass.pushDebugGroup(groupLabel);
        return methods;
    };
    const setBindGroup = (index, bindGroup, dynamicOffsets)=>{
        computePass.setBindGroup(index, bindGroup, dynamicOffsets);
        return methods;
    };
    const setPipeline = (pipeline)=>{
        computePass.setPipeline(pipeline);
        return methods;
    };
    const methods = {
        dispatchWorkgroups: dispatchWorkgroups,
        dispatchWorkgroupsIndirect: dispatchWorkgroupsIndirect,
        end: end,
        insertDebugMarker: insertDebugMarker,
        popDebugGroup: popDebugGroup,
        pushDebugGroup: pushDebugGroup,
        setBindGroup: setBindGroup,
        setPipeline: setPipeline
    };
    return methods;
};
const $9b01685ef546c50b$export$4e5ed83502b74c41 = (commandEncoder, descriptor)=>{
    const renderPass = commandEncoder.beginRenderPass(descriptor);
    const beginOcclusionQuery = (queryIndex)=>{
        renderPass.beginOcclusionQuery(queryIndex);
        return methods;
    };
    const draw = (vertexCount, instanceCount, firstVertex, firstInstance)=>{
        renderPass.draw(vertexCount, instanceCount, firstVertex, firstInstance);
        return methods;
    };
    const drawIndexed = (indexCount, instanceCount, firstIndex, baseVertex, firstInstance)=>{
        renderPass.drawIndexed(indexCount, instanceCount, firstIndex, baseVertex, firstInstance);
        return methods;
    };
    const drawIndexedIndirect = (indirectBuffer, indirectOffset)=>{
        renderPass.drawIndexedIndirect(indirectBuffer, indirectOffset);
        return methods;
    };
    const drawIndirect = (indirectBuffer, indirectOffset)=>{
        renderPass.drawIndirect(indirectBuffer, indirectOffset);
        return methods;
    };
    const end = ()=>{
        renderPass.end();
    };
    const endOcclusionQuery = ()=>{
        renderPass.endOcclusionQuery();
        return methods;
    };
    const executeBundles = (bundles)=>{
        renderPass.executeBundles(bundles);
        return methods;
    };
    const insertDebugMarker = (markerLabel)=>{
        renderPass.insertDebugMarker(markerLabel);
        return methods;
    };
    const popDebugGroup = ()=>{
        renderPass.popDebugGroup();
        return methods;
    };
    const pushDebugGroup = (groupLabel)=>{
        renderPass.pushDebugGroup(groupLabel);
        return methods;
    };
    const setBindGroup = (index, bindGroup, dynamicOffsets)=>{
        renderPass.setBindGroup(index, bindGroup, dynamicOffsets);
        return methods;
    };
    const setBlendConstant = (color)=>{
        renderPass.setBlendConstant(color);
        return methods;
    };
    const setIndexBuffer = (buffer, indexFormat, offset, size)=>{
        renderPass.setIndexBuffer(buffer, indexFormat, offset, size);
        return methods;
    };
    const setPipeline = (pipeline)=>{
        renderPass.setPipeline(pipeline);
        return methods;
    };
    const setScissorRect = (x, y, width, height)=>{
        renderPass.setScissorRect(x, y, width, height);
        return methods;
    };
    const setStencilReference = (reference)=>{
        renderPass.setStencilReference(reference);
        return methods;
    };
    const setVertexBuffer = (slot, buffer, offset, size)=>{
        renderPass.setVertexBuffer(slot, buffer, offset, size);
        return methods;
    };
    const setViewport = (x, y, width, height, minDepth, maxDepth)=>{
        renderPass.setViewport(x, y, width, height, minDepth, maxDepth);
        return methods;
    };
    const methods = {
        beginOcclusionQuery: beginOcclusionQuery,
        draw: draw,
        drawIndexed: drawIndexed,
        drawIndexedIndirect: drawIndexedIndirect,
        drawIndirect: drawIndirect,
        end: end,
        endOcclusionQuery: endOcclusionQuery,
        executeBundles: executeBundles,
        insertDebugMarker: insertDebugMarker,
        popDebugGroup: popDebugGroup,
        pushDebugGroup: pushDebugGroup,
        setBindGroup: setBindGroup,
        setBlendConstant: setBlendConstant,
        setIndexBuffer: setIndexBuffer,
        setPipeline: setPipeline,
        setScissorRect: setScissorRect,
        setStencilReference: setStencilReference,
        setVertexBuffer: setVertexBuffer,
        setViewport: setViewport
    };
    return methods;
};
const $9b01685ef546c50b$export$5d00d6927df701df = (descriptor)=>{
    return descriptor;
};
const $9b01685ef546c50b$export$802bc10488da99c7 = {
    Compute: $9b01685ef546c50b$export$4e355586494de655,
    Render: $9b01685ef546c50b$export$4e5ed83502b74c41,
    RenderPassDescriptor: $9b01685ef546c50b$export$5d00d6927df701df
};


const $963b4ae97a45b9b2$export$2cd8252107eb640b = async (canvas, options)=>{
    const gpu = navigator.gpu;
    if (!gpu) {
        const msg = `WebGPU is not supported in this browser`;
        console.error(msg);
        (0, $5dcb00b280cce78c$export$fc0ab3c81b435d2b)("Error", msg);
        return;
    }
    const adapter = await gpu.requestAdapter();
    if (!adapter) {
        const msg = `couldn't request WebGPU adapter`;
        console.error(msg);
        (0, $5dcb00b280cce78c$export$fc0ab3c81b435d2b)("Error", msg);
        return;
    }
    const device = await adapter?.requestDevice(options);
    device.lost.then(()=>{
        const msg = `WebGPU device was lost...`;
        console.error(msg);
        return;
    });
    const context = canvas.getContext("webgpu");
    const preferredFormat = gpu.getPreferredCanvasFormat();
    const queue = device.queue;
    const getCurrentTexture = ()=>context?.getCurrentTexture();
    const createView = ()=>context?.getCurrentTexture().createView();
    const CommandEncoder = (device)=>device.createCommandEncoder();
    return {
        gpu: gpu,
        adapter: adapter,
        device: device,
        context: context,
        preferredFormat: preferredFormat,
        queue: queue,
        getCurrentTexture: getCurrentTexture,
        createView: createView,
        CommandEncoder: CommandEncoder,
        Shader: // Shader
        $c83327048459abbb$export$462bb059fed9d9e5,
        Buffer: // Buffer
        $63f4911f20da9a77$export$a143d493d941bafc,
        createVertexAttribute: // Vertex
        $c88b6730aafb3233$export$330652b0e7de7308,
        createVertexBufferLayout: $c88b6730aafb3233$export$ff2c64c5fad693d1,
        Binding: // BindGroup
        $c1ba1b8dce2c3978$export$f4f50f872cf9bd86,
        Group: $c1ba1b8dce2c3978$export$eb2fcfdbd7ba97d4,
        BindGroup: $c1ba1b8dce2c3978$export$6f452ee382def63c,
        PipelineLayout: // Pipeline
        $c03ab52147b8b08e$export$38d414bb53ca9314,
        ComputePipeline: $c03ab52147b8b08e$export$efa01fade62e48fc,
        RenderPipeline: $c03ab52147b8b08e$export$52ff0c46af33b1fd,
        Pipeline: $c03ab52147b8b08e$export$abd47b564b6c9ce2,
        beginComputePass: // Pass
        $9b01685ef546c50b$export$4e355586494de655,
        beginRenderPass: $9b01685ef546c50b$export$4e5ed83502b74c41,
        createRenderPassDescriptor: $9b01685ef546c50b$export$5d00d6927df701df,
        Pass: $9b01685ef546c50b$export$802bc10488da99c7
    };
};
const $963b4ae97a45b9b2$export$4c5139ab6ef540de = {
    init: $963b4ae97a45b9b2$export$2cd8252107eb640b
};


export {$963b4ae97a45b9b2$export$2cd8252107eb640b as init, $963b4ae97a45b9b2$export$4c5139ab6ef540de as Orton, $936f9c0c9519c9e4$export$2d0294657ab35f1b as Data, $c83327048459abbb$export$462bb059fed9d9e5 as Shader, $63f4911f20da9a77$export$a143d493d941bafc as Buffer, $c88b6730aafb3233$export$330652b0e7de7308 as createVertexAttribute, $c88b6730aafb3233$export$ff2c64c5fad693d1 as createVertexBufferLayout, $c1ba1b8dce2c3978$export$f4f50f872cf9bd86 as Binding, $c1ba1b8dce2c3978$export$eb2fcfdbd7ba97d4 as Group, $c1ba1b8dce2c3978$export$6f452ee382def63c as BindGroup, $c03ab52147b8b08e$export$38d414bb53ca9314 as PipelineLayout, $c03ab52147b8b08e$export$efa01fade62e48fc as ComputePipeline, $c03ab52147b8b08e$export$52ff0c46af33b1fd as RenderPipeline, $c03ab52147b8b08e$export$abd47b564b6c9ce2 as Pipeline, $9b01685ef546c50b$export$4e355586494de655 as beginComputePass, $9b01685ef546c50b$export$4e5ed83502b74c41 as beginRenderPass, $9b01685ef546c50b$export$5d00d6927df701df as createRenderPassDescriptor, $9b01685ef546c50b$export$802bc10488da99c7 as Pass};
//# sourceMappingURL=Orton.js.map
