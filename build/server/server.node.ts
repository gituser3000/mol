namespace $ {
	
	export class $mol_build_server extends $mol_server {
		
		expressGenerator() {
			return $mol_fiber_root( (
				req : typeof $node.express.request ,
				res : typeof $node.express.response ,
				next : () => any
			)=> {

				try {

					return $mol_fiber_unlimit( ()=> this.generate( req.url ) && Promise.resolve().then( next ) )
				
				} catch( error ) {

					if( typeof error.then === 'function' ) $mol_fail_hidden( error )
					
					if( $mol_fail_catch( error ) ) {
						console.error( $node.colorette.red( `$mol_build_server fail ${ req.path }` ) )
						console.error( $node.colorette.redBright( error ) + '\n' )
					}
					
					if( req.url.match( /\.js$/ ) ) {

						const script = ( error as Error ).message.split( '\n\n' ).map( msg => {
							return `console.error( ${ JSON.stringify( msg ) } )`
						} ).join( '\n' )
						
						res.send( script ).end()

					} else {

						res.status(500).send( error.message ).end()

					}

				}
			} )
		}
		
		build() : $mol_build {
			return $mol_fail( new Error( 'Not implemented' ) )
		}

		@ $mol_mem_key
		generate( url : string ) {

			const matched = url.match( /^(.*)\/-\/(\w+(?:.\w+)+)$/ )
			if( !matched ) return <$mol_file[]>[]
			
			const build = this.build()
			
			const [ , rawpath , bundle ] = matched
			const mod = build.root().resolve( rawpath )

			if( bundle === 'web.css' ) console.warn( $node.colorette.yellow( 'Deprecation: CSS compiles into JS bundle now! You do not need web.css' ) )
			
			const path = mod.path()

			return build.bundle( { path , bundle } )
			
		}
		
		expressIndex() {
			return (
				req : typeof $node.express.request ,
				res : typeof $node.express.response ,
				next : () => void
			) => {
				const match =  req.url.match( /(.*[^\-]\/)([\?#].*)?$/ )
				if (! match) return next()

				const file = $mol_file.absolute(this.rootPublic())
					.resolve(`${req.path}index.html`)

				if (! file.exists()) return next()

				res.redirect(301, `${match[1]}-/test.html${match[2] ?? ''}`)
			}
		}
		
		port() {
			return 9080
		}

		@ $mol_mem
		start() {

			return this.socket().on( 'connection' , ( line , req )=> {
				
				const path = req.url!.replace( /\/-.*/ , '' ).substring( 1 )

				const build = this.build()
				const bundle = build.root().resolve( path )

				const { magenta , magentaBright } = $node.colorette

				console.log( magenta( `$mol_build_server connection ${ magentaBright( path ) }` ) )

				const autorun = $mol_atom2_autorun( ()=> {

					try {
		
						const sources = build.sourcesAll({ path: bundle.path() , exclude : [ 'node' ] })
						for( const src of sources ) src.buffer()
		
					} catch( error ) {

						if( $mol_compare_deep( autorun.error , error ) ) return true
						
					}
					
					if( !$mol_atom2_value( ()=> autorun.get() ) ) return true

					console.log( magenta( `$mol_build_obsolete ${ magentaBright( path ) }` ) )
						
					line.send( '$mol_build_obsolete' )

					return true
		
				} )

				line.on( 'close' , ()=> autorun.destructor() )

			} )
			
		}
		
	}

}
