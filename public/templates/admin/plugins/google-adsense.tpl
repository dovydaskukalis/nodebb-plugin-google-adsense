<h1>Google Adsense</h1>
<p>
	Detailed readme can be found on <a href="https://github.com/dovydaskukalis/nodebb-plugin-google-adsense" target="_blank">GitHub</a>
</p>
<form role="form" class="google-adsense-settings form">
	<div class="form-group">
		<label for="client_id">Publisher ID (<a href="https://support.google.com/adsense/answer/105516?hl=en" target="_blank" title="More information">?</a>)</label>
		<input type="text" class="form-control" id="client_id" name="client_id" placeholder="pub-xxxxxxxxxxxxxxxx">
	</div>
	<div class="row">
		<div class="col-sm-10">
		</script>
		<div class="form-group">
			<label for="header_id">Header ad slot ID (<a href="https://www.google.com/adsense/app#myads-viewall-adunits" target="_blank" title="More information">?</a>)</label>
			<input type="text" class="form-control" id="header_id" name="header_id" placeholder="xxxxxxxxxx">
		</div>
		<div class="form-group">
			<label for="footer_id">Footer ad slot ID (<a href="https://www.google.com/adsense/app#myads-viewall-adunits" target="_blank" title="More information">?</a>)</label>
			<input type="text" class="form-control" name="footer_id" id="footer_id" placeholder="xxxxxxxxxx">
		</div>
		<div class="form-group">
			<div class="row">
				<div class="col-sm-8">
					<label for="first_post_id">First post ad slot ID (<a href="https://www.google.com/adsense/app#myads-viewall-adunits" target="_blank" title="More information">?</a>)</label>
					<input type="text" class="form-control" name="first_post_id" id="first_post_id" placeholder="xxxxxxxxxx">
				</div>
				<div class="col-sm-4">
					<label for="first_post_position">First post ad slot position</label>
					<select id="first_post_position" name="first_post_position" class="form-control">
						<option value="bottom">Bottom</option>
						<option value="top">Top</option>
						<option value="left">Left</option>
						<option value="right">Right</option>
					</select>
				</div>
			</div>
		</div>
	</div>
	<div class="col-sm-2">
		<div class="form-group">
			<label for="header_active"></label>
			<input type="checkbox" class="form-control" name="header_active" id="header_active">
		</div>
		<div class="form-group">
			<label for="footer_active"></label>
			<input type="checkbox" class="form-control" name="footer_active" id="footer_active">
		</div>
		<div class="form-group">
			<label for="first_post_active"></label>
			<input type="checkbox" class="form-control" name="first_post_active" id="first_post_active">
		</div>
	</div>
</div>
<button type="submit" class="btn btn-primary" id="save">Submit</button>
</form>

<script type="text/javascript">
	require(['settings'], function(Settings) {
		Settings.load('google-adsense', $('.google-adsense-settings'));

		$('#save').on('click', function() {
			Settings.save('google-adsense', $('.google-adsense-settings'), function() {
				socket.emit('admin.restart');
			});
			return false;
		});
	});
</script>