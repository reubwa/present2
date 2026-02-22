<script lang="ts">
	import BaseDialog from "./BaseDialog.svelte";

	let {show = $bindable() } = $props();
	let dialog: HTMLDialogElement | undefined = $state();

</script>
<BaseDialog bind:dialog bind:show>
    <div class="flex flex-col gap-2.5">
        <p>Present 2 ©2026 Reuben Waring, licensed under the Apache 2 Licence.</p>
        <p>Powered by <a href="https://revealjs.com/" target="_blank">Reveal.js</a>, licensed under the MIT Licence. Copyright (c) 2017 Dmitry Korolev.</p>
        <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.</p>
        <p>Maths powered by <a href="https://www.mathjax.org/" target="_blank">MathJax</a>.</p>
        <p>Icons provided by <a href="https://lucide.dev/icons/" target="_blank">Lucide Icons</a>.</p>
        <p>Code Highlighting powered by <a href="https://highlightjs.org/" target="_blank">Highlight.js</a>.</p>
        <p>Built using <a href="https://svelte.dev/" target="_blank">Svelte</a> and SvelteKit.</p>
        <p>GitHub Repository: <a href="https://github.com/reubwa/present2" target="_blank">https://github.com/reubwa/present2</a>.</p>
    </div>
</BaseDialog>
<style>
    a {
        color: lightblue;
    }
    p {
        color: white;
    }
</style>