"===================Importing plugins.vim===============
so ~/.vim/plugins.vim



"----------------Basic-----------------"
let mapleader = ',' "The default leader is \, but a comma is much better"
syntax on
set number
set relativenumber
set modifiable
set write
"set autowriteall
set noerrorbells visualbell t_vb=
:set tabstop=4
:set expandtab
:set shiftwidth=4
:set autoindent
:set smartindent
:set cindent 



"----------------Visuals-----------------"
set guifont=Menlo:h12 				"font family and font size"
"colorscheme atom-dark-256
colorscheme desert
set t_CO=256;					"useful for terminal vim"
			"Macvim-specific line-height"
set linespace=12
set guioptions-=l
set guioptions-=L
set guioptions-=r
set guioptions-=R




"----------------Searching-----------------"
set hlsearch
set incsearch




"----------------Mapping-----------------"
"Make it easy to edit the vimrc file
nmap <leader>ev :tabedit $MYVIMRC <cr>
nmap <leader>ep :tabedit ~/.vim/plugins.vim<cr>
nmap <leader><space> :nohlsearch <cr>
imap jj <Esc>




"----------------Auto-command-----------------"
"Automatically source the vimrc file 
augroup autovimsource
	autocmd!
	autocmd BufWritePost .vimrc source %
augroup END





"----------------Split Management-----------------"
"--usally in vim new split will be appeared on top and left. I am  making opposite
set splitbelow 
set splitright
nmap <C-J> <C-W><C-J>
nmap <C-K> <C-W><C-K>
nmap <C-H> <C-W><C-H>
nmap <C-L> <C-W><C-L> 




"----------------auto completion-----------------"
set complete=.,w,b,u





"----------------Plugin mapping-----------------"
nmap <D-1> :NERDTreeToggle<cr>
nmap <c-R> :CtrlPBufTag<cr>
nmap <c-e> :CtrlPMRU<cr>
let g:ctrlp_custom_ignore = 'node_modules\.DS_Store\.git'
let g:ctrlp_match_window = 'top,order:ttb,min:1,max:30,results:30'
"----------------Note-----------------"
"ctrl + command + f -> for toggle full screen in macVim
"the default key binding for switch  between split is ctrl + w + [hjkl]

"ctrl + w + | -> will take the full space of current split
"ctrol + w + =  -> to normalize split window
"bp and bn is very handy to switch between file

"to create a new file or delete, rename in nerd tree type m. it will show all
"the  option it has like a - create file. d - delete file. to make a folder
"you have to put / at the end of the file name
"ctrl + n = auto complete
"sbuffer <buffer no> = tho split buffer
"bd<buffer no> = to delete specific buffer
