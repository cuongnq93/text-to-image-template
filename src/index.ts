export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const title = url.searchParams.get("title") || "cyberpunk cat";
		const width = parseInt(url.searchParams.get("width") || "1024");
		const height = parseInt(url.searchParams.get("height") || "1024");

		const inputs = {
			prompt: title,
			width,
			height,
			num_steps: 4, // Recommended for SDXL-Lightning
		};

		const response = await env.AI.run(
			"@cf/bytedance/stable-diffusion-xl-lightning",
			inputs,
		);

		return new Response(response, {
			headers: {
				"content-type": "image/png",
				"cache-control": "public, max-age=86400",
			},
		});
	},
} satisfies ExportedHandler<Env>;
